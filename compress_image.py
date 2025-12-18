from PIL import Image
import os

source_path = r'c:\Users\Hernán\Documents\HS PORTFOLIO ANTIGRAVITY\Portfolio\assets\img\imgFotoPerfilEditado.png'
dest_path = r'c:\Users\Hernán\Documents\HS PORTFOLIO ANTIGRAVITY\Portfolio\assets\img\imgFotoPerfilEditado_websize.jpg'

try:
    with Image.open(source_path) as img:
        # Convert to RGB (in case of RGBA png)
        rgb_img = img.convert('RGB')
        
        # Resize if it's huge (optional, but good for reducing size)
        # Max width 800px is usually plenty for a resume photo
        max_width = 800
        if rgb_img.width > max_width:
            ratio = max_width / rgb_img.width
            new_height = int(rgb_img.height * ratio)
            rgb_img = rgb_img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
        # Save with optimization and quality reduction
        rgb_img.save(dest_path, 'JPEG', optimize=True, quality=80)
        
    print(f"Success: Image saved to {dest_path}")
    print(f"Original size: {os.path.getsize(source_path) / 1024:.2f} KB")
    print(f"New size: {os.path.getsize(dest_path) / 1024:.2f} KB")

except Exception as e:
    print(f"Error: {e}")
