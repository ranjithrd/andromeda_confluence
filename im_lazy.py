for i in range(1, 41, 2):
    string = '''{ name: "%s", image: "/images/%s.jpg" },\n{ name: "%s", image: "/images/%s.jpg" },'''%(str(i), str(i), str(i), str(i+1))
    print(string)