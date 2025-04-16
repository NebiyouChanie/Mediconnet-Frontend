"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Building, Users, Hospital, Activity } from "lucide-react"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalHospitals: 0,
    activeHospitals: 0,
    totalAdmins: 0,
    activeUsers: 0,
  })

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    setStats({
      totalHospitals: 12,
      activeHospitals: 10,
      totalAdmins: 15,
      activeUsers: 120,
    })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">System Administration Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Hospitals</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHospitals}</div>
            <p className="text-xs text-muted-foreground">Registered in the system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Hospitals</CardTitle>
            <Hospital className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeHospitals}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hospital Admins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAdmins}</div>
            <p className="text-xs text-muted-foreground">Registered administrators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Across all hospitals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Hospital Registrations</CardTitle>
            <CardDescription>Latest hospitals added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* This would be a list of recent hospitals */}
              <p className="text-sm text-muted-foreground">No recent registrations</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Recent actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* This would be a list of recent activities */}
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
