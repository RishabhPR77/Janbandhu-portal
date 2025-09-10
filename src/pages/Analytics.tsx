import { Typography, Paper, Box } from '@mui/material';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { analyticsData } from '@/data/demoData';

export default function Analytics() {
  const COLORS = ['#eab308', '#3b82f6', '#22c55e', '#ef4444'];

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Insights and trends from citizen complaints data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Complaints by Status - Pie Chart */}
        <Paper className="p-6 h-96">
          <Typography variant="h6" className="mb-4 font-semibold">
            Complaints by Status
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analyticsData.complaintsByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.complaintsByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* Complaints by Department - Bar Chart */}
        <Paper className="p-6 h-96">
          <Typography variant="h6" className="mb-4 font-semibold">
            Complaints by Department
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={analyticsData.complaintsByDepartment}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(214 84% 56%)" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </div>

      {/* Complaints Trend - Line Chart */}
      <Paper className="p-6 h-96 mb-6">
        <Typography variant="h6" className="mb-4 font-semibold">
          Complaints Trend (Last 10 Days)
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={analyticsData.complaintsTrend}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'short' 
              })}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => new Date(date).toLocaleDateString('en-IN')}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="hsl(174 72% 56%)" 
              strokeWidth={3}
              dot={{ fill: 'hsl(174 72% 56%)', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Paper className="p-4 text-center">
          <Typography variant="h4" className="font-bold text-primary mb-2">
            {analyticsData.complaintsByStatus.reduce((sum, item) => sum + item.value, 0)}
          </Typography>
          <Typography variant="body2" className="text-muted-foreground">
            Total Complaints
          </Typography>
        </Paper>
        
        <Paper className="p-4 text-center">
          <Typography variant="h4" className="font-bold text-warning mb-2">
            {analyticsData.complaintsByStatus.find(item => item.name === 'Pending')?.value || 0}
          </Typography>
          <Typography variant="body2" className="text-muted-foreground">
            Pending Complaints
          </Typography>
        </Paper>
        
        <Paper className="p-4 text-center">
          <Typography variant="h4" className="font-bold text-success mb-2">
            {analyticsData.complaintsByStatus.find(item => item.name === 'Resolved')?.value || 0}
          </Typography>
          <Typography variant="body2" className="text-muted-foreground">
            Resolved Complaints
          </Typography>
        </Paper>
        
        <Paper className="p-4 text-center">
          <Typography variant="h4" className="font-bold text-info mb-2">
            {Math.round(
              ((analyticsData.complaintsByStatus.find(item => item.name === 'Resolved')?.value || 0) /
              analyticsData.complaintsByStatus.reduce((sum, item) => sum + item.value, 0)) * 100
            )}%
          </Typography>
          <Typography variant="body2" className="text-muted-foreground">
            Resolution Rate
          </Typography>
        </Paper>
      </div>
    </div>
  );
}