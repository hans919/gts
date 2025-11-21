import { Download, FileText, Table, PieChart, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Reports() {
  const reports = [
    {
      id: 1,
      title: 'Graduate Employment Report',
      description: 'Comprehensive employment statistics and trends',
      icon: Users,
    },
    {
      id: 2,
      title: 'Salary Analysis Report',
      description: 'Salary distribution across programs and industries',
      icon: TrendingUp,
    },
    {
      id: 3,
      title: 'Survey Response Report',
      description: 'Survey completion rates and feedback analysis',
      icon: PieChart,
    },
    {
      id: 4,
      title: 'Program Outcomes Report',
      description: 'Success metrics by academic program',
      icon: Table,
    },
  ];

  const handleExport = (format: string, reportId: number) => {
    alert(`Exporting report ${reportId} as ${format}. This feature will be implemented soon!`);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate and export comprehensive graduate tracer reports
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => {
          const IconComponent = report.icon;
          return (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleExport('PDF', report.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport('Excel', report.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Excel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport('CSV', report.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Export functionality coming soon</p>
              <p className="text-sm text-muted-foreground">
                PDF, Excel, and CSV export features will be fully implemented in the next update.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
