# Recipe List
recipes = {
    'Old Fashioned': ['whiskey', 'simple', 'bitters']
}

# TODO filter function
ingredient = 'whiskey'
for (key, value) in recipes.items():
    if value.__contains__(ingredient):
        print(key)

# Stream(?) filter
# Sort stream
# Get full recipe text for selected recipe