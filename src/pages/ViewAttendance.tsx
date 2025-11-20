import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Download, Printer, Calendar, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ViewAttendance = () => {
  const [pin, setPin] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setAttendanceData(null);

    // Simulate API call delay
    setTimeout(() => {
      // Mock attendance data for demonstration
      const mockData = {
        studentInfo: {
          name: "John Doe",
          rollNo: pin || "24054-CPS-011",
          semester: "4th Semester",
          branch: "Computer Science & Engineering",
          section: "A",
          academicYear: "2024-2025"
        },
        overallAttendance: {
          totalClasses: 120,
          attendedClasses: 95,
          percentage: 79.17,
          status: "Good"
        },
        subjectWiseAttendance: [
          {
            subjectCode: "CSE401",
            subjectName: "Data Structures & Algorithms",
            totalClasses: 25,
            attendedClasses: 22,
            percentage: 88,
            status: "Excellent"
          },
          {
            subjectCode: "CSE402",
            subjectName: "Database Management Systems",
            totalClasses: 25,
            attendedClasses: 20,
            percentage: 80,
            status: "Good"
          },
          {
            subjectCode: "CSE403",
            subjectName: "Operating Systems",
            totalClasses: 25,
            attendedClasses: 18,
            percentage: 72,
            status: "Average"
          },
          {
            subjectCode: "CSE404",
            subjectName: "Computer Networks",
            totalClasses: 25,
            attendedClasses: 21,
            percentage: 84,
            status: "Good"
          },
          {
            subjectCode: "CSE405",
            subjectName: "Software Engineering",
            totalClasses: 20,
            attendedClasses: 14,
            percentage: 70,
            status: "Average"
          }
        ],
        recentAttendance: [
          { date: "2025-01-15", subject: "Data Structures", status: "Present", time: "10:00 AM" },
          { date: "2025-01-14", subject: "Database Systems", status: "Present", time: "11:00 AM" },
          { date: "2025-01-13", subject: "Operating Systems", status: "Absent", time: "2:00 PM" },
          { date: "2025-01-12", subject: "Computer Networks", status: "Present", time: "10:00 AM" },
          { date: "2025-01-11", subject: "Software Engineering", status: "Present", time: "11:00 AM" },
          { date: "2025-01-10", subject: "Data Structures", status: "Present", time: "2:00 PM" },
          { date: "2025-01-09", subject: "Database Systems", status: "Absent", time: "10:00 AM" }
        ]
      };

      setAttendanceData(mockData);
      setIsLoading(false);
    }, 2000); // 2 second delay to simulate API call
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'text-green-600 bg-green-50';
      case 'Good': return 'text-blue-600 bg-blue-50';
      case 'Average': return 'text-yellow-600 bg-yellow-50';
      case 'Poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAttendanceStatusColor = (status: string) => {
    return status === 'Present' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  const renderStudentInfo = (studentInfo: any) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Student Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Name</Label>
            <p className="text-lg font-semibold">{studentInfo.name}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Roll Number</Label>
            <p className="text-lg font-semibold">{studentInfo.rollNo}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Semester</Label>
            <p className="text-lg font-semibold">{studentInfo.semester}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Branch</Label>
            <p className="text-lg font-semibold">{studentInfo.branch}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Section</Label>
            <p className="text-lg font-semibold">{studentInfo.section}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Academic Year</Label>
            <p className="text-lg font-semibold">{studentInfo.academicYear}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderOverallAttendance = (overallAttendance: any) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Overall Attendance Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{overallAttendance.totalClasses}</div>
            <div className="text-sm text-muted-foreground">Total Classes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{overallAttendance.attendedClasses}</div>
            <div className="text-sm text-muted-foreground">Classes Attended</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{overallAttendance.percentage.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Attendance %</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold px-3 py-1 rounded-full ${getStatusColor(overallAttendance.status)}`}>
              {overallAttendance.status}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Status</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSubjectWiseAttendance = (subjects: any[]) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Subject-wise Attendance</CardTitle>
        <CardDescription>Detailed attendance breakdown by subject</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject Code</TableHead>
              <TableHead>Subject Name</TableHead>
              <TableHead className="text-center">Total Classes</TableHead>
              <TableHead className="text-center">Attended</TableHead>
              <TableHead className="text-center">Percentage</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{subject.subjectCode}</TableCell>
                <TableCell>{subject.subjectName}</TableCell>
                <TableCell className="text-center">{subject.totalClasses}</TableCell>
                <TableCell className="text-center">{subject.attendedClasses}</TableCell>
                <TableCell className="text-center font-semibold">{subject.percentage}%</TableCell>
                <TableCell className="text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subject.status)}`}>
                    {subject.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderRecentAttendance = (recentAttendance: any[]) => (
    <Card>
      <CardHeader>
        <CardTitle>Recent Attendance History</CardTitle>
        <CardDescription>Last 7 days attendance record</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="text-center">Time</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAttendance.map((record, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {new Date(record.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </TableCell>
                <TableCell>{record.subject}</TableCell>
                <TableCell className="text-center">{record.time}</TableCell>
                <TableCell className="text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="py-8 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              View Attendance
            </h1>
            <p className="text-muted-foreground">
              Fetch attendance data from SBTET Telangana portal
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Student PIN
              </CardTitle>
              <CardDescription>
                Enter your PIN to fetch attendance data from SBTET Telangana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="max-w-md">
                  <Label htmlFor="pin">PIN</Label>
                  <Input
                    id="pin"
                    placeholder="Enter PIN (e.g., 24054-cps-011)"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Fetch Attendance
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Alert className="mb-6" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Attendance Data Display */}
          {attendanceData && (
            <div className="space-y-6">
              {renderStudentInfo(attendanceData.studentInfo)}
              {renderOverallAttendance(attendanceData.overallAttendance)}
              {renderSubjectWiseAttendance(attendanceData.subjectWiseAttendance)}
              {renderRecentAttendance(attendanceData.recentAttendance)}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewAttendance;