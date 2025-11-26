import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Calculator, Calendar, AlertTriangle, CheckCircle, Info, Target } from 'lucide-react';
import { useState } from 'react';
import GlassmorphismBackground from '@/components/GlassmorphismBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AttendanceCalculator = () => {
  const [formData, setFormData] = useState({
    totalClasses: '',
    attendedClasses: '',
    semester: '',
    branch: ''
  });

  const [result, setResult] = useState<{
    percentage: number;
    status: 'excellent' | 'good' | 'warning' | 'danger';
    message: string;
    remainingClasses: number;
    canMiss: number;
  } | null>(null);

  const calculateAttendance = () => {
    const total = parseInt(formData.totalClasses);
    const attended = parseInt(formData.attendedClasses);

    if (!total || !attended || attended > total) {
      return;
    }

    const percentage = Math.round((attended / total) * 100);
    let status: 'excellent' | 'good' | 'warning' | 'danger';
    let message = '';

    if (percentage >= 85) {
      status = 'excellent';
      message = 'Excellent attendance! You\'re eligible for all examinations.';
    } else if (percentage >= 75) {
      status = 'good';
      message = 'Good attendance. You\'re eligible for examinations.';
    } else if (percentage >= 65) {
      status = 'warning';
      message = 'Your attendance is below 75%. Consider improving it.';
    } else {
      status = 'danger';
      message = 'Critical! Your attendance is below 65%. You may not be eligible for examinations.';
    }

    // Calculate remaining classes needed for 75%
    const remainingClasses = total - attended;
    const targetAttendance = Math.ceil((total * 0.75) - attended);
    const canMiss = Math.floor(attended / 0.75 - total);

    setResult({
      percentage,
      status,
      message,
      remainingClasses,
      canMiss: canMiss > 0 ? canMiss : 0
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'danger': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const attendanceTips = [
    "Maintain at least 75% attendance for examination eligibility",
    "SBTET requires minimum 65% attendance for final eligibility",
    "Medical certificates are accepted for genuine medical issues",
    "Regular attendance helps in better understanding of subjects",
    "Use the calculator regularly to track your progress"
  ];

  return (
    <GlassmorphismBackground intensity="light" className="bg-gradient-flow">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 py-20 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-slide-up">
              Attendance
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Calculate your attendance percentage and check your examination eligibility
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Calculate Your Attendance
                </CardTitle>
                <CardDescription>
                  Enter your attendance details to calculate percentage and eligibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={formData.semester} onValueChange={(value) => setFormData({...formData, semester: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Semester</SelectItem>
                        <SelectItem value="2">2nd Semester</SelectItem>
                        <SelectItem value="3">3rd Semester</SelectItem>
                        <SelectItem value="4">4th Semester</SelectItem>
                        <SelectItem value="5">5th Semester</SelectItem>
                        <SelectItem value="6">6th Semester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Select value={formData.branch} onValueChange={(value) => setFormData({...formData, branch: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="civil">Civil Engineering</SelectItem>
                        <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                        <SelectItem value="electrical">Electrical Engineering</SelectItem>
                        <SelectItem value="electronics">Electronics Engineering</SelectItem>
                        <SelectItem value="computer">Computer Engineering</SelectItem>
                        <SelectItem value="automobile">Automobile Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalClasses">Total Classes Conducted</Label>
                    <Input
                      id="totalClasses"
                      type="number"
                      placeholder="e.g., 120"
                      value={formData.totalClasses}
                      onChange={(e) => setFormData({...formData, totalClasses: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendedClasses">Classes Attended</Label>
                    <Input
                      id="attendedClasses"
                      type="number"
                      placeholder="e.g., 95"
                      value={formData.attendedClasses}
                      onChange={(e) => setFormData({...formData, attendedClasses: e.target.value})}
                    />
                  </div>
                </div>

                <Button
                  onClick={calculateAttendance}
                  className="w-full bg-gradient-brand hover:opacity-90 transition-smooth"
                  disabled={!formData.totalClasses || !formData.attendedClasses}
                >
                  Calculate Attendance
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {result && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    Attendance Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{result.percentage}%</div>
                    <Progress value={result.percentage} className="h-3 mb-2" />
                    <p className={`text-lg font-medium ${getStatusColor(result.status)}`}>
                      {result.message}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{result.remainingClasses}</div>
                      <div className="text-sm text-muted-foreground">Classes Remaining</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{result.canMiss}</div>
                      <div className="text-sm text-muted-foreground">Classes You Can Miss</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Recommendations
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {result.percentage >= 75 ? (
                        <li>• Keep up the good attendance!</li>
                      ) : (
                        <>
                          <li>• You need to attend {Math.ceil((parseInt(formData.totalClasses) * 0.75) - parseInt(formData.attendedClasses))} more classes to reach 75%</li>
                          <li>• Focus on regular attendance in upcoming classes</li>
                        </>
                      )}
                      <li>• Minimum 65% required for examination eligibility</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Attendance Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Attendance Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">75%+</Badge>
                    <span className="text-sm">Full eligibility for all exams</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-500">65-74%</Badge>
                    <span className="text-sm">Conditional eligibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">Below 65%</Badge>
                    <span className="text-sm">Not eligible for exams</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips for Better Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {attendanceTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Calculator</CardTitle>
                <CardDescription>
                  Calculate percentage instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Total" type="number" />
                  <Input placeholder="Attended" type="number" />
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Quick Calculate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </GlassmorphismBackground>
  );
};

export default AttendanceCalculator;