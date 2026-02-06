from PIL import Image
from collections import Counter

def get_dominant_colors(image_path, num_colors=5):
    try:
        image = Image.open(image_path)
        image = image.resize((150, 150))  # Resize to speed up
        image = image.convert('RGB')
        
        pixels = list(image.getdata())
        counts = Counter(pixels)
        common = counts.most_common(num_colors)
        
        hex_colors = []
        for color, count in common:
            hex_colors.append('#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2]))
            
        return hex_colors
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    colors = get_dominant_colors('clipboard/img_1.png')
    print(colors)
