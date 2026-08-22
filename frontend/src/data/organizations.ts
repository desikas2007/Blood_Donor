import { RequesterProfile } from "@/types/requester";

export const dummyOrganizations: RequesterProfile[] = [
  {
    id: "org1",
    user_id: "u11",
    type: "organization",
    name: "Red Cross Society",
    phone: "+91-9876543221",
    email: "redcross@example.com",
    city: "Tiruchengode",
    state: "Tamil Nadu",
    address: "456 NGO Road, Tiruchengode",
    created_at: "2026-01-08T00:00:00Z",
  },
  {
    id: "org2",
    user_id: "u13",
    type: "organization",
    name: "Blood Warriors Foundation",
    phone: "+91-9876543222",
    email: "bloodwarriors@example.com",
    city: "Coimbatore",
    state: "Tamil Nadu",
    address: "78 Health Park, Coimbatore",
    created_at: "2026-02-01T00:00:00Z",
  },
];

export const dummyHospitals: RequesterProfile[] = [
  {
    id: "h1",
    user_id: "u10",
    type: "hospital",
    name: "KSR Hospital",
    phone: "+91-9876543220",
    email: "ksrhospital@example.com",
    city: "Tiruchengode",
    state: "Tamil Nadu",
    address: "123 Main Road, Tiruchengode",
    created_at: "2026-01-05T00:00:00Z",
  },
  {
    id: "h2",
    user_id: "u14",
    type: "hospital",
    name: "City Hospital",
    phone: "+91-9876543223",
    email: "cityhospital@example.com",
    city: "Salem",
    state: "Tamil Nadu",
    address: "45 Hospital Road, Salem",
    created_at: "2026-01-15T00:00:00Z",
  },
];
