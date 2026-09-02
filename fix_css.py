import sys
import codecs

filepath = 'app/globals.css'

# Open as binary to strip the bad utf-16 chars if any
with open(filepath, 'rb') as f:
    content_bytes = f.read()

# The append was done with UTF-16LE at the end of a UTF-8 file.
# The original file length was before the echo.
# I'll just rewrite it from a clean state.
