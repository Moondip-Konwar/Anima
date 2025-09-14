
# backend/add.py
import sys

def main():
    # Get command line arguments (skip the first one, which is the script name)
    args = sys.argv[1:]
    
    # Convert all args to integers
    try:
        numbers = [int(arg) for arg in args]
    except ValueError:
        print("Error: all arguments must be numbers")
        sys.exit(1)
    
    # Calculate sum
    total = sum(numbers)
    
    # Print the result (stdout will be captured by Rust/Tauri)
    print(total)

if __name__ == "__main__":
    main()
