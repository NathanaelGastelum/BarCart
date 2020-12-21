# Recipe List
recipes = {
    'Old Fashioned': {'whiskey', 'simple', 'bitters'},
    'Gin Sour': {'gin', 'lemon juice', 'simple'},
    'Whiskey Sour': {'whiskey', 'lemon juice', 'simple'},
    'Hot Toddy': {'whiskey', 'lemon juice', 'honey', 'hot water', 'cinnamon stick'},
    'Sidecar': {'cognac', 'orange liqueur', 'lemon juice'}
}

input = {'whiskey', 'lemon juice'}

# TODO filter function
result = []
for (key, value) in recipes.items():
    if value.intersection(input):
        result.append(key)

print(result)

# Stream(?) filter
# Sort stream
# Get full recipe text for selected recipe
# Dictionary of ingrediencts so one ingredient can add multiple things (ex: lemons would also add lemon juice, lemon twist, lemon slice)