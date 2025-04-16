import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { ArrowLeft, MoreVertical, UserPlus } from "lucide-react"
import AdminForm from "./components/AdminForm"

// Sample hospital data
const sampleHospitals = [
  {
    id: "1",
    name: "General Hospital",
    location: "Addis Ababa",
    address: "123 Main St, Addis Ababa",
    contactPerson: "John Doe",
    contactEmail: "john@example.com",
    contactPhone: "+251 911 234 567",
    description: "A leading general hospital providing comprehensive healthcare services.",
    type: "general",
    status: "active",
    admins: [
      {
        id: "101",
        firstName: "Admin",
        lastName: "One",
        email: "admin1@example.com",
        status: "active",
        lastLogin: "2023-04-10T14:30:00Z",
      },
      {
        id: "102",
        firstName: "Admin",
        lastName: "Two",
        email: "admin2@example.com",
        status: "active",
        lastLogin: "2023-04-05T09:15:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "Community Medical Center",
    location: "Bahir Dar",
    address: "456 Lake View, Bahir Dar",
    contactPerson: "Jane Smith",
    contactEmail: "jane@example.com",
    contactPhone: "+251 922 345 678",
    description: "A community-focused medical center serving the local population.",
    type: "health-center",
    status: "active",
    admins: [
      {
        id: "103",
        firstName: "Admin",
        lastName: "Three",
        email: "admin3@example.com",
        status: "active",
        lastLogin: "2023-04-08T11:20:00Z",
      },
    ],
  },
  {
    id: "3",
    name: "Regional Health Center",
    location: "Hawassa",
    address: "789 Lake Road, Hawassa",
    contactPerson: "Michael Johnson",
    contactEmail: "michael@example.com",
    contactPhone: "+251 933 456 789",
    description: "A regional health center providing specialized care.",
    type: "specialized",
    status: "inactive",
    admins: [],
  },
]

const HospitalDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hospital, setHospital] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")
  const [showAddAdminForm, setShowAddAdminForm] = useState(false)

  // Simulate fetching hospital data
  useEffect(() => {
    const fetchHospital = async () => {
      try {
        // In a real app, you would fetch this data from your API
        const foundHospital = sampleHospitals.find((h) => h.id === id)

        if (foundHospital) {
          setHospital(foundHospital)
        } else {
          // Handle hospital not found
          navigate("/system-admin/hospital-management")
        }
      } catch (error) {
        console.error("Error fetching hospital:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHospital()
  }, [id, navigate])

  const handleAddAdmin = () => {
    setShowAddAdminForm(true)
    setActiveTab("admins")
  }

  const handleAdminCreated = (newAdmin) => {
    // In a real app, you would refresh the data from the API
    setHospital({
      ...hospital,
      admins: [...hospital.admins, newAdmin],
    })
    setShowAddAdminForm(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

if (loading) {
    return <div className="p-6">Loading hospital details...</div>
  }

  if (!hospital) {
    return <div className="p-6">Hospital not found</div>
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => navigate("/system-admin/hospital-management")} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{hospital.name}</h1>
        <Badge variant={hospital.status === "active" ? "success" : "destructive"} className="ml-4">
          {hospital.status === "active" ? "Active" : "Inactive"}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Hospital Details</TabsTrigger>
          <TabsTrigger value="admins">Administrators</TabsTrigger>
          <TabsTrigger value="patients">Patient Records</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Information</CardTitle>
              <CardDescription>Details about {hospital.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Hospital Name</p>
                      <p>{hospital.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Type</p>
                      <p className="capitalize">{hospital.type.replace("-", " ")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p>{hospital.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p>{hospital.address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Description</p>
                      <p>{hospital.description || "No description provided"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Contact Person</p>
                      <p>{hospital.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p>{hospital.contactEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p>{hospital.contactPhone}</p>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium text-muted-foreground mt-6 mb-2">System Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant={hospital.status === "active" ? "success" : "destructive"}>
                        {hospital.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Administrators</p>
                      <p>{hospital.admins.length} administrator(s)</p>
                    </div>
                  </div>
                </div>
              </div>

Tsige, [4/3/2025 11:12 PM]
<div className="mt-6 flex justify-end">
                <Button variant="outline" className="mr-2">
                  Edit Hospital
                </Button>
                <Button variant={hospital.status === "active" ? "destructive" : "success"}>
                  {hospital.status === "active" ? "Deactivate" : "Activate"} Hospital
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hospital Administrators</CardTitle>
                <CardDescription>Manage administrators for {hospital.name}</CardDescription>
              </div>
              {!showAddAdminForm && (
                <Button onClick={handleAddAdmin}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Administrator
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {showAddAdminForm ? (
                <AdminForm
                  hospitalId={hospital.id}
                  hospitalName={hospital.name}
                  onAdminCreated={handleAdminCreated}
                  onFinish={() => setShowAddAdminForm(false)}
                />
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hospital.admins.length > 0 ? (
                        hospital.admins.map((admin) => (
                          <TableRow key={admin.id}>
                            <TableCell className="font-medium">{`${admin.firstName} ${admin.lastName}`}</TableCell>
                            <TableCell>{admin.email}</TableCell>
                            <TableCell>
                              <Badge variant={admin.status === "active" ? "success" : "destructive"}>
                                {admin.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(admin.lastLogin)}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                  <DropdownMenuItem
                                    className={admin.status === "active" ? "text-destructive" : "text-green-600"}
                                  >
                                    {admin.status === "active" ? "Deactivate" : "Activate"}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            No administrators found
                          </TableCell>
                        </TableRow>


)}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>View patient records from {hospital.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No patient records available
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default HospitalDetail