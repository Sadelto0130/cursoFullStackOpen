const listHelper = require('../utils/list_helper.js')


test("dummy returns one", () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})