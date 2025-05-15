import { fetchGroupedUsers } from '@/services/fetchGroupedUsers';

describe('fetchGroupedUsers', () => {
  it('should return an object grouped by department', async () => {
    const result = await fetchGroupedUsers();

    expect(typeof result).toBe('object');
    const departments = Object.keys(result);
    expect(departments.length).toBeGreaterThan(0);

    for (const dept of departments) {
      const data = result[dept];
      expect(data).toHaveProperty('male');
      expect(data).toHaveProperty('female');
      expect(data).toHaveProperty('hair');
      expect(data).toHaveProperty('addressUser');
      expect(data).toHaveProperty('ageRange');
    }
  });
});
