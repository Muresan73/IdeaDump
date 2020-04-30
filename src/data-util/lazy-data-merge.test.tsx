import { merge1to1 } from './lazy-data-merge';

interface Hospilat {
  category: 'Hospital';
  address: string;
  institute: string;
  id: string;
}
interface PrivateHome {
  category: 'Private';
  address: string;
  ownerID: string;
  id: string;
}
type Address = Hospilat | PrivateHome;

interface Pet {
  name: string;
  owner: {
    ownerID: string;
  };
  hospialId: string;
}

interface Owner {
  id: string;
  ownerName: string;
  ownerAddressId: string;
}

const petData: { pets: Pet[] } = {
  pets: [
    {
      name: 'Cirmi',
      owner: { ownerID: 'ow01' },
      hospialId: 'ad13',
    },
    {
      name: 'Buk',
      owner: { ownerID: 'ow02' },
      hospialId: 'ad09',
    },
    {
      name: 'White',
      owner: { ownerID: 'ow02' },
      hospialId: 'ad13',
    },
    {
      name: 'Chuck',
      owner: { ownerID: 'ow01' },
      hospialId: 'ad09',
    },
    {
      name: 'Pluto',
      owner: { ownerID: 'ow01' },
      hospialId: 'wrong999',
    },
  ],
};
const adressData: { addressList: Address[] } = {
  addressList: [
    {
      address: 'Eleventh Avenue',
      category: 'Hospital',
      institute: 'St. Mark',
      id: 'ad13',
    },
    {
      category: 'Private',
      ownerID: 'ow01',
      address: '1st street',
      id: 'ph11',
    },
    {
      address: 'Twelves Avenue',
      category: 'Hospital',
      institute: 'St. James',
      id: 'ad09',
    },
    {
      category: 'Private',
      ownerID: 'ow02',
      address: 'The Wall',
      id: 'ph21',
    },
  ],
};
const ownerData: { owners: Owner[] } = {
  owners: [
    {
      ownerName: 'Lis Bon',
      id: 'ow01',
      ownerAddressId: 'ph11',
    },
    {
      ownerName: 'John Snow',
      id: 'ow02',
      ownerAddressId: 'ph21',
    },
  ],
};

test('attach datas', () => {

  const lookupPetsOwnerId = (pet):[string,any]=>[pet.owner.ownerID,pet.owner]
  expect(merge1to1(petData.pets, ownerData,lookupPetsOwnerId)).toBe(11);
});
