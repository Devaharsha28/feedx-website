#!/usr/bin/env python3
"""SBTET Attendance API Server

A Flask API that fetches attendance data from SBTET Telangana and provides CORS-enabled endpoints.
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DEFAULT_URL_TEMPLATE = "https://www.sbtet.telangana.gov.in/api/api/PreExamination/getAttendanceReport?Pin={pin}"


def fetch_report_pin(pin: str):
    """Fetch attendance report from SBTET API"""
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)"
            " Chrome/122.0.0.0 Safari/537.36"
        ),
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "en-US,en;q=0.9",
        "X-Requested-With": "XMLHttpRequest",
        "Referer": "https://www.sbtet.telangana.gov.in/",
    }
    
    # Try with double /api/ first, then fallback to single /api/
    urls_to_try = [
        DEFAULT_URL_TEMPLATE.format(pin=pin),
        DEFAULT_URL_TEMPLATE.replace("/api/api/", "/api/").format(pin=pin)
    ]
    
    last_exc = None
    for url in urls_to_try:
        try:
            resp = requests.get(url, headers=headers, timeout=15)
            resp.raise_for_status()
            
            # SBTET API returns a JSON string, so we need to parse it
            try:
                # First try direct JSON parsing
                data = resp.json()
                # If data is a string, parse it again
                if isinstance(data, str):
                    import json
                    data = json.loads(data)
                return data
            except ValueError as json_err:
                # If that fails, try parsing the text response
                try:
                    import json
                    data = json.loads(resp.text)
                    return data
                except Exception as e:
                    print(f"DEBUG - Failed to parse JSON. Error: {e}")
                    print(f"DEBUG - Response text (first 500 chars): {resp.text[:500]}")
                    raise json_err
                    
        except requests.exceptions.HTTPError as exc:
            last_exc = exc
            continue
        except ValueError as exc:
            raise exc
    
    # If we get here, none of the URLs succeeded
    if last_exc:
        raise last_exc
    raise requests.exceptions.RequestException("Unknown error fetching from SBTET API")


@app.route("/api/attendance", methods=["GET"])
def get_attendance():
    """API endpoint to fetch attendance by PIN"""
    pin = request.args.get("pin")
    
    if not pin:
        return jsonify({"error": "Missing pin parameter"}), 400

    try:
        data = fetch_report_pin(pin)
        
        # Debug: Log the raw response
        print(f"DEBUG - Raw API response for PIN {pin}:")
        print(f"Response type: {type(data)}")
        
        if not data:
            return jsonify({
                "success": False,
                "error": "No data returned from SBTET API"
            }), 404
        
        # Extract student info and attendance records
        response = {
            "success": True,
            "studentInfo": {},
            "attendanceRecords": []
        }
        
        # SBTET returns Table (student info) and Table1 (daily attendance)
        if isinstance(data, dict):
            # Check if response indicates no data/invalid PIN
            if not data or all(not v for v in data.values()):
                print(f"DEBUG - Empty or null response from SBTET")
                return jsonify({
                    "success": False,
                    "error": "No data found for this PIN. Please verify the PIN is correct."
                }), 404
            
            if "Table" in data and isinstance(data["Table"], list) and data["Table"]:
                response["studentInfo"] = data["Table"][0]
                print(f"DEBUG - Student info extracted: {response['studentInfo']}")
            else:
                print(f"DEBUG - No Table found or Table is empty")
            
            if "Table1" in data and isinstance(data["Table1"], list):
                response["attendanceRecords"] = data["Table1"]
                print(f"DEBUG - Found {len(response['attendanceRecords'])} attendance records in Table1")
            elif "Table" in data and isinstance(data["Table"], list):
                # Only use Table for records if we haven't already used it for student info
                if not response["studentInfo"]:
                    response["attendanceRecords"] = data["Table"]
                    print(f"DEBUG - Found {len(response['attendanceRecords'])} attendance records in Table")
            else:
                print(f"DEBUG - No attendance records found")
        
        # Final check: if no student info, return error
        if not response["studentInfo"] or len(response["studentInfo"]) == 0:
            print(f"DEBUG - No student info in final response")
            return jsonify({
                "success": False,
                "error": "No data found for this PIN. The PIN may be invalid or not in the SBTET system."
            }), 404
        
        print(f"DEBUG - Final response structure: {response.keys()}")
        print(f"DEBUG - Student info has {len(response['studentInfo'])} fields")
        print(f"DEBUG - Attendance records: {len(response['attendanceRecords'])} records")
        return jsonify(response), 200
        
    except requests.exceptions.HTTPError as e:
        status_code = e.response.status_code if hasattr(e, 'response') else 502
        if status_code == 404:
            return jsonify({"error": "Student not found. Please check the PIN."}), 404
        return jsonify({"error": f"HTTP Error: {str(e)}"}), status_code
        
    except requests.exceptions.Timeout:
        return jsonify({"error": "Request timeout. Please try again."}), 504
        
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Network error: {str(e)}"}), 502
        
    except ValueError as e:
        error_msg = f"Invalid JSON response: {str(e)}"
        print(f"ERROR - {error_msg}")
        return jsonify({"success": False, "error": error_msg}), 502
        
    except Exception as e:
        error_msg = f"Server error: {str(e)}"
        print(f"ERROR - {error_msg}")
        import traceback
        traceback.print_exc()
        return jsonify({"success": False, "error": error_msg}), 500


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok", "service": "SBTET Attendance API"}), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    print(f"Starting SBTET Attendance API on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)
