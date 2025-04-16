"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Badge } from "../../components/ui/badge"
import { Plus, MoreVertical, Search, X } from "lucide-react"
import HospitalForm from "./components/HospitalForm"

// Sample hospital data
const sampleHospitals = [
  {
    id: "1",
    name: "General Hospital",
    location: "Addis Ababa",
    contactPerson: "John Doe",
    contactEmail: "john@example.com",
    status: "active",
    admins: [
      { id: "101", name: "Admin One", email: "admin1@example.com" },
      { id: "102", name: "Admin Two", email: "admin2@example.com" },
    ],
  },
  {
    id: "2",
    name: "Community Medical Center",
    location: "Bahir Dar",
    contactPerson: "Jane Smith",
    contactEmail: "jane@example.com",
    status: "active",
    admins: [{ id: "103", name: "Admin Three", email: "admin3@example.com" }],
  },
  {
    id: "3",
    name: "Regional Health Center",
    location: "Hawassa",
    contactPerson: "Michael Johnson",
    contactEmail: "michael@example.com",
    status: "inactive",
    admins: [],
  },
]

const HospitalManagement = () => {
  const navigate = useNavigate()
  const [hospitals, setHospitals] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you would fetch this data from your API
    setHospitals(sampleHospitals)
  }, [])

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddHospital = () => {
    setShowAddForm(true)
  }

  const handleHospitalCreated = (newHospital) => {
    // In a real app, you would refresh the data from the API
    setHospitals([...hospitals, { ...newHospital, id: Date.now().toString(), admins: [] }])
    setShowAddForm(false)
  }

  const handleViewDetails = (hospitalId) => {
    navigate(`/system-admin/hospital-management/${hospitalId}`)
  }

  return (
    <div className="p-6">
      {showAddForm ? (
        <div className="fixed inset-0 left-60 bg-background z-50 overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h1 className="text-2xl font-bold">Add New Hospital</h1>
            <Button variant="ghost" size="icon" onClick={() => setShowAddForm(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <HospitalForm onHospitalCreated={handleHospitalCreated} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Hospital Management</h1>
            <Button onClick={handleAddHospital}>
              <Plus className="mr-2 h-4 w-4" />
              Add Hospital
            </Button>
          </div>

          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>


          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hospital Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Admins</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHospitals.length > 0 ? (
                  filteredHospitals.map((hospital) => (
                    <TableRow key={hospital.id}>
                      <TableCell className="font-medium">{hospital.name}</TableCell>
                      <TableCell>{hospital.location}</TableCell>
                      <TableCell>{hospital.contactPerson}</TableCell>
                      <TableCell>{hospital.contactEmail}</TableCell>
                      <TableCell>
                        <Badge variant={hospital.status === "active" ? "success" : "destructive"}>
                          {hospital.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{hospital.admins.length}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(hospital.id)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className={hospital.status === "active" ? "text-destructive" : "text-green-600"}
                            >
                              {hospital.status === "active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No hospitals found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}

export default HospitalManagement
