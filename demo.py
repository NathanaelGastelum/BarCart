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

# Recipe Dictionary
# recipes = {
#     'Old Fashioned': {'whiskey', 'simple', 'bitters'},
#     'Gin Sour': {'gin', 'lemon juice', 'simple'},
#     'Whiskey Sour': {'whiskey', 'lemon juice', 'simple'},
#     'Hot Toddy': {'whiskey', 'lemon juice', 'honey', 'hot water', 'cinnamon stick'},
#     'Sidecar': {'cognac', 'orange liqueur', 'lemon juice'}
# }

# Stream(?) filter
# Sort stream
# Get full recipe text for selected recipe (at to recipes shelve as a new dictionary)
# Dictionary of ingrediencts so one ingredient can add multiple things to the inventory (ex: lemons would also add lemon juice, lemon twist, lemon slice)