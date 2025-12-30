import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Auth = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("signin");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    // Signup specific fields
    const [name, setName] = useState("");
    const [pin, setPin] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState<"student" | "faculty">("student");

    // Success state
    const [accountCreated, setAccountCreated] = useState(false);
    const [newUsername, setNewUsername] = useState("");

    useEffect(() => {
        // Check existing session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                checkUserRoleAndRedirect(session.user.id);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    checkUserRoleAndRedirect(session.user.id);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [navigate]);

    const checkUserRoleAndRedirect = async (userId: string) => {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', userId)
                .single();

            if (error) throw error;

            if (profile?.role === 'student') {
                navigate('/student/menu');
            } else if (profile?.role === 'faculty') {
                navigate('/faculty');
            } else {
                // Fallback if role is missing or unknown
                toast({
                    title: "Error",
                    description: "User role not found. Please contact support.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (activeTab === "signin") {
                // Check if exists
                const { error } = await supabase.auth.signInWithOtp({
                    email,
                    options: { shouldCreateUser: false }
                });

                if (error) {
                    if (error.message.includes("Signups not allowed")) {
                        // This means user doesn't exist and we disabled auto-signup on signin
                        toast({
                            title: "Account not found",
                            description: "Please switch to Sign Up tab to create an account.",
                            variant: "destructive"
                        });
                        setActiveTab("signup");
                    } else {
                        throw error;
                    }
                } else {
                    setOtpSent(true);
                    toast({ title: "OTP Sent", description: "Check your email for the code." });
                }
            } else {
                // Signup
                if (!name || !department) {
                    toast({ title: "Missing fields", description: "Please fill in all required fields", variant: "destructive" });
                    setLoading(false);
                    return;
                }

                // PIN is only required for students
                if (role === "student") {
                    if (!pin) {
                        toast({ title: "Missing PIN", description: "PIN number is required for students", variant: "destructive" });
                        setLoading(false);
                        return;
                    }
                    // PIN Validation: <5nums>-<max3letters>-<3nums> e.g. 23054-CPS-005
                    const pinRegex = /^\d{5}-[A-Z]{1,3}-\d{3}$/;
                    if (!pinRegex.test(pin)) {
                        toast({
                            title: "Invalid PIN Format",
                            description: "PIN must match format: 12345-ABC-123 (5 digits - Branch - 3 digits)",
                            variant: "destructive"
                        });
                        setLoading(false);
                        return;
                    }
                }

                const { error } = await supabase.auth.signInWithOtp({
                    email,
                    options: {
                        data: {
                            name: name.toUpperCase(),
                            pin: pin || null,
                            department,
                            role: role
                        }
                    }
                });

                if (error) throw error;
                setOtpSent(true);
                toast({ title: "OTP Sent", description: "Check your email for the code." });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to send OTP",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Use 'email' type for both signup and signin with magiclink/OTP
            const { data, error } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: 'email'  // This is correct for email OTP
            });

            if (error) {
                console.error('OTP Verification Error:', error);
                throw error;
            }

            if (!data.user) {
                throw new Error('No user data returned after verification');
            }

            if (activeTab === "signup") {
                // Fetch generated username for students
                // Wait a bit for trigger to run
                await new Promise(resolve => setTimeout(resolve, 1500));

                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('username, role')
                    .eq('id', data.user.id)
                    .single();

                if (profileError) {
                    console.error('Profile fetch error:', profileError);
                }

                if (profile && profile.role === 'student' && profile.username) {
                    setNewUsername(profile.username);
                    setAccountCreated(true);
                } else {
                    // Faculty or no username - redirect will happen via useEffect
                }
            }
            // If signin, the useEffect will handle redirect based on role
        } catch (error: any) {
            console.error('Verification error details:', error);
            toast({
                title: "Invalid OTP",
                description: error.message || "The OTP code is incorrect or has expired. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    if (accountCreated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <CardTitle className="text-2xl text-green-600">Account Created!</CardTitle>
                        <CardDescription>Welcome to FXBOT</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Your Username</p>
                            <p className="text-2xl font-bold tracking-wider font-mono">{newUsername}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Please save this username for future reference.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => navigate('/student/menu')}>
                            Continue to Dashboard
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <Card className="w-full max-w-md glass border-none animate-scale-in relative z-10">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto w-20 h-20 mb-4 animate-fade-in-up">
                        <img src="/fxbot-app/logo.jpg" alt="FXBOT Logo" className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-white/50" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-gradient">FXBOT</CardTitle>
                    <CardDescription className="text-base">Institutional Feedback System</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="signin">
                            {!otpSent ? (
                                <form onSubmit={handleSendOTP} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Send OTP
                                    </Button>
                                </form>
                            ) : (
                                <form onSubmit={handleVerifyOTP} className="space-y-4">
                                    <div className="space-y-2 text-center">
                                        <Label>Enter OTP sent to {email}</Label>
                                        <p className="text-xs text-muted-foreground mt-1 text-center">Please check your spam folder too</p>
                                        <div className="flex justify-center py-4">
                                            <InputOTP maxLength={8} value={otp} onChange={setOtp}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                    <InputOTPSlot index={6} />
                                                    <InputOTPSlot index={7} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading || otp.length < 8}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Verify & Login
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="flex-1"
                                            onClick={() => {
                                                setOtpSent(false);
                                                setOtp("");
                                            }}
                                        >
                                            Change Email
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={async () => {
                                                setOtp("");
                                                await handleSendOTP(new Event('submit') as any);
                                            }}
                                            disabled={loading}
                                        >
                                            Resend OTP
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </TabsContent>

                        <TabsContent value="signup">
                            {!otpSent ? (
                                <form onSubmit={handleSendOTP} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email">Email Address</Label>
                                        <Input
                                            id="signup-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>I am a</Label>
                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                variant={role === "student" ? "default" : "outline"}
                                                className="flex-1"
                                                onClick={() => setRole("student")}
                                            >
                                                Student
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={role === "faculty" ? "default" : "outline"}
                                                className="flex-1"
                                                onClick={() => setRole("faculty")}
                                            >
                                                Faculty
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value.toUpperCase())}
                                            placeholder="JOHN DOE"
                                            required
                                        />
                                    </div>

                                    {role === "student" && (
                                        <div className="space-y-2">
                                            <Label htmlFor="pin">PIN Number</Label>
                                            <Input
                                                id="pin"
                                                value={pin}
                                                onChange={(e) => setPin(e.target.value)}
                                                placeholder="23054-CPS-005"
                                                required
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="dept">Department</Label>
                                        <Input
                                            id="dept"
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            placeholder="CPS"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Create Account
                                    </Button>
                                </form>
                            ) : (
                                <form onSubmit={handleVerifyOTP} className="space-y-4">
                                    <div className="space-y-2 text-center">
                                        <Label>Enter OTP sent to {email}</Label>
                                        <p className="text-xs text-muted-foreground mt-1 text-center">Please check your spam folder too</p>
                                        <div className="flex justify-center py-4">
                                            <InputOTP maxLength={8} value={otp} onChange={setOtp}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                    <InputOTPSlot index={6} />
                                                    <InputOTPSlot index={7} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading || otp.length < 8}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Verify & Create
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="flex-1"
                                            onClick={() => {
                                                setOtpSent(false);
                                                setOtp("");
                                            }}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1"
                                            onClick={async () => {
                                                setOtp("");
                                                await handleSendOTP(new Event('submit') as any);
                                            }}
                                            disabled={loading}
                                        >
                                            Resend OTP
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default Auth;
