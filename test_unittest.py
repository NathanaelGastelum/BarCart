import demo    # The code to test
import unittest   # The test framework
import shelve

class Test_TestSearchFilter(unittest.TestCase):

    def test_increment(self):
        with shelve.open('recipes') as db:
            actual = demo.search({'whiskey', 'lemon juice'}, db['recipes'])
            self.assertEqual(actual, 
                {'Hot Toddy', 'Whiskey Sour'})

    def test_decrement(self):
        with shelve.open('recipes') as db:
            actual = demo.filter({'whiskey', 'gin', 'lemon juice', 'simple'}, db['recipes'], 1)
            self.assertEqual(actual, 
                {'Gin Sour', 'Whiskey Sour', 'Old Fashioned'})

if __name__ == '__main__':
    unittest.main()