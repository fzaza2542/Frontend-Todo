import { IMappedDepartment, IUsers } from '@/app/model';
import axios from 'axios';

export async function fetchGroupedUsers(): Promise<IMappedDepartment> {
  const res = await axios.get<{ users: IUsers[] }>('https://dummyjson.com/users');
  const users: IUsers[] = res.data.users;

  const result: IMappedDepartment = {};

  for (const user of users) {
    const dept = user.company.department;
    if (!result[dept]) {
      result[dept] = {
        male: 0,
        female: 0,
        ageRange: '',
        hair: {},
        addressUser: {},
        ages: []
      };
    }

    const deptData = result[dept];

    deptData[user.gender]++;
    deptData.hair[user.hair.color] = (deptData.hair[user.hair.color] || 0) + 1;
    deptData.addressUser[`${user.firstName}${user.lastName}`] = user.address.postalCode;
    deptData?.ages?.push(user.age);
  }

  for (const dept in result) {
    const ages = result[dept].ages!;
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);
    result[dept].ageRange = `${minAge}-${maxAge}`;
    delete result[dept].ages;
  }

  console.log("mapped user by department ===>", result);

  return result;
}
