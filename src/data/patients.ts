const patients = [
  {
    id: 1,
    name: "Jon Snow",
    age: 35,
    gender: "male",
    address: "America's Beverage, 1331 E. Airport Freeway, Irving",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    age: 42,
    gender: "female",
    address: "Anderson Bakery, 433 Sayre Street, Anderson",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    age: 45,
    gender: "male",
    address: "Centennial Farms, 2121 Falulkner Rd, Atlanta",
  },
  {
    id: 4,
    name: "Arya Stark",
    age: 16,
    gender: "female",
    address: "KB Specialty Foods, 1225 N. Broadway St., Greensburg",
  },
  {
    id: 6,
    name: "Daenerys Targaryen",
    age: 150,
    gender: "female",
    address: "Pace Dairy of IN, 800 Englewood Dr., Crawsfordsville",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    age: 44,
    gender: "male",
    address: "Tamarack Farms, 1701 Tamarack Rd, Newark",
  },
  {
    id: 8,
    name: "Rossini Frances",
    age: 36,
    gender: "male",
    address: "Westover Dairy, 2801 Fort Ave., Lynchburg",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    age: 65,
    gender: "male",
    address: "Deli Kitchen, 2201 S. Wilmington Ave, Compton",
  },
];

export function getPatients() {
  return patients;
}

export function getPatient(id: number) {
  const result = patients.find(p => p.id === id);
  if (result === undefined)
    throw new Error(`No Patent, id: ${id}`)
  return result
}

