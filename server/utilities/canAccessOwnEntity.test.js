const canAccessOwnEntity = require('./canAccessOwnEntity');

describe.each`
  ownedRequired | currentUser     | entityUser      | expectedReturn
  ${false}      | ${{ _id: '0' }} | ${{ _id: '0' }} | ${true}
  ${true}       | ${{ _id: '0' }} | ${{ _id: '0' }} | ${true}
  ${false}      | ${{ _id: '1' }} | ${{ _id: '0' }} | ${true}
  ${false}      | ${{ _id: '0' }} | ${{ _id: '1' }} | ${true}
  ${true}       | ${{ _id: '1' }} | ${{ _id: '0' }} | ${false}
  ${true}       | ${{ _id: '0' }} | ${{ _id: '1' }} | ${false}
  ${false}      | ${{}}           | ${{ _id: '0' }} | ${true}
  ${false}      | ${{ _id: '0' }} | ${{}}           | ${true}
  ${false}      | ${null}         | ${{ _id: '0' }} | ${true}
  ${false}      | ${{ _id: '0' }} | ${null}         | ${true}
  ${true}       | ${{}}           | ${{ _id: '0' }} | ${false}
  ${true}       | ${{ _id: '0' }} | ${{}}           | ${false}
  ${true}       | ${null}         | ${{ _id: '0' }} | ${false}
  ${true}       | ${{ _id: '0' }} | ${null}         | ${false}
`('test canAccessOwnEntity with different values', ({ ownedRequired, currentUser, entityUser, expectedReturn }) => {
  const shouldReturn = `should return ${expectedReturn}`;
  const ownedRequiredString = ownedRequired ? 'owned is required' : 'owned is not required';
  const currentUserString = `current user is ${currentUser ? JSON.stringify(currentUser) : 'null'}`;
  const entityUserString = `entity user is ${currentUser ? JSON.stringify(currentUser) : 'null'}`;

  it(`${shouldReturn} ${ownedRequiredString} and ${currentUserString} and ${entityUserString}`, async () => {
    const canAccessOwnEntityResult = canAccessOwnEntity(ownedRequired, currentUser, entityUser);
    expect(canAccessOwnEntityResult).toBe(expectedReturn);
  });
});