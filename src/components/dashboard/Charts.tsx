"use client";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const tooltipStyle = {
  contentStyle: { background: "#0F0F10", border: "1px solid #2A2A2E", borderRadius: 12, color: "#F5F5F7" },
  cursor: { fill: "rgba(245,217,10,0.05)" },
};

export function AreaChartBrand({ data, dataKey, xKey = "month", height = 280 }: { data: any[]; dataKey: string; xKey?: string; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="areaBrand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5D90A" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#F5D90A" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#1F1F22" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xKey} stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip {...tooltipStyle} />
        <Area type="monotone" dataKey={dataKey} stroke="#F5D90A" strokeWidth={2.5} fill="url(#areaBrand)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarComparison({ data, keys, height = 280 }: { data: any[]; keys: { key: string; color: string; label: string }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#1F1F22" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#A1A1AA" }} />
        {keys.map((k) => (
          <Bar key={k.key} dataKey={k.key} name={k.label} fill={k.color} radius={[6, 6, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LineMulti({ data, lines, height = 280, xKey = "month" }: { data: any[]; lines: { key: string; color: string; label: string }[]; height?: number; xKey?: string }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#1F1F22" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xKey} stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#71717A" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#A1A1AA" }} />
        {lines.map((l) => <Line key={l.key} type="monotone" dataKey={l.key} name={l.label} stroke={l.color} strokeWidth={2.5} dot={false} />)}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({ data, height = 280 }: { data: { name: string; value: number; color: string }[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} stroke="none">
          {data.map((d) => <Cell key={d.name} fill={d.color} />)}
        </Pie>
        <Tooltip {...tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}
