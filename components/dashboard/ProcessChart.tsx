'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { STATS } from '@/lib/mock-data'

export function ProcessPieChart() {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-2 px-4 md:px-6">
        <CardTitle className="text-xs md:text-sm font-semibold text-foreground">Procesos por estado</CardTitle>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="h-32 w-32 md:h-40 md:w-40 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATS.porEstado}
                  cx="50%"
                  cy="50%"
                  innerRadius={32}
                  outerRadius={52}
                  paddingAngle={2}
                  dataKey="valor"
                >
                  {STATS.porEstado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [value, name]}
                  contentStyle={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-1.5 md:gap-2 min-w-0 w-full sm:w-auto">
            {STATS.porEstado.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="h-2 w-2 md:h-2.5 md:w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate text-[10px] md:text-xs text-muted-foreground">{item.nombre}</span>
                <span className="ml-auto text-[10px] md:text-xs font-medium text-foreground pl-2 whitespace-nowrap">
                  {item.valor}
                  <span className="text-muted-foreground ml-1">({item.porcentaje}%)</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function InspeccionesBarChart() {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-2 px-4 md:px-6">
        <CardTitle className="text-xs md:text-sm font-semibold text-foreground">Inspecciones por mes</CardTitle>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <div className="h-36 md:h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={STATS.inspeccionesPorMes} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                axisLine={false}
                tickLine={false}
                width={20}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }}
              />
              <Bar dataKey="inspecciones" name="Inspecciones" fill="var(--color-chart-1)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="verificaciones" name="Verificaciones" fill="var(--color-chart-4)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
