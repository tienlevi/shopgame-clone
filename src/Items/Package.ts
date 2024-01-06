interface Package {
  id: number;
  name: any;
}

interface Item {
  id: number;
  version: Package[];
}

const packageData: Item[] = [
  {
    id: 1,
    version: [
      { id: 1, name: "Standard" },
      { id: 1, name: "Update" },
    ],
  },
  {
    id: 2,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 3,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 4,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 5,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 6,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 7,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 8,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 9,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 10,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 11,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 12,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 13,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 14,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 15,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 16,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 17,
    version: [{ id: 1, name: [] }],
  },
  {
    id: 18,
    version: [{ id: 1, name: [] }],
  },
];

export default packageData;
