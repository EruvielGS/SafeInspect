'use client'

import { AppLayout, useSidebar } from '@/components/layout/AppLayout'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { INSPECTORES } from '@/lib/mock-data'
import { Shield } from 'lucide-react'

function UsuariosContent() {
  const { toggleSidebar } = useSidebar()

  return (
    <>
      <Header 
        title="Usuarios" 
        subtitle="Gestión de inspectores y administradores" 
        onMenuClick={toggleSidebar}
      />
      <div className="p-4 md:p-6 grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {INSPECTORES.map((inspector) => (
          <Card key={inspector.id} className="border-border/60 shadow-sm">
            <CardContent className="flex items-center gap-3 md:gap-4 p-4 md:p-5">
              <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-bold shrink-0">
                {inspector.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-medium text-foreground truncate">{inspector.nombre}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Shield className="h-3 w-3 text-muted-foreground" />
                  <p className="text-[10px] md:text-xs text-muted-foreground">Inspector</p>
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground truncate">ID: {inspector.idIne}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default function UsuariosPage() {
  return (
    <AppLayout>
      <UsuariosContent />
    </AppLayout>
  )
}
