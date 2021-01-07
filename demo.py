# search function
# first add complete matching recipes
# then recipes with extra ingredients
# TODO sort by how many extra ingredients are needed 
#   (how much bigger the recipe set is than the input)
def search(input, recipes):
    result = set()
    for (key, recipe) in recipes.items():
        if input == recipe:
            result.add(key)
        if input.issubset(recipe):
            result.add(key)

    return result

# filter function
# add recipes that are subsets of input
# add recipes with intersections
# TODO add command line arguments for filter options
# sort by number of intersections
def filter(input, recipes, extraAllowance):
    result = set()
    for (key, recipe) in recipes.items():
        if input.issuperset(recipe):
            result.add(key)
        # filter amount of non intersections allowed
        if recipe.__len__() - input.intersection(recipe).__len__() <= extraAllowance:
            result.add(key)
    return result

# Recipe List
recipes = {
    'Old Fashioned': {'whiskey', 'simple', 'bitters'},
    'Gin Sour': {'gin', 'lemon juice', 'simple'},
    'Hot Toddy': {'whiskey', 'lemon juice', 'honey', 'hot water', 'cinnamon stick'},
    'Whiskey Sour': {'whiskey', 'lemon juice', 'simple'},
    'Sidecar': {'cognac', 'orange liqueur', 'lemon juice'}
}

# Test input
input = {'whiskey', 'lemon juice'}
print(search(input, recipes))

input = {'whiskey', 'gin', 'lemon juice', 'simple'}
print(filter(input, recipes, 1))

# Stream(?) filter
# Sort stream
# Get full recipe text for selected recipe
# Dictionary of ingrediencts so one ingredient can add multiple things 
# (ex: lemons would also add lemon juice, lemon twist, lemon slice)
#   Alternatively, the recipe data will just be "lemon" regardless of what the 
#   full recipe text is