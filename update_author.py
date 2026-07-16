import os
import subprocess

# Configure local git
os.system('git config user.name "abhinavkumarrath"')
os.system('git config user.email "abhinavkumarrath2@gmail.com"')

# Set environment variables for the author change
os.environ['GIT_AUTHOR_NAME'] = 'abhinavkumarrath'
os.environ['GIT_AUTHOR_EMAIL'] = 'abhinavkumarrath2@gmail.com'
os.environ['GIT_COMMITTER_NAME'] = 'abhinavkumarrath'
os.environ['GIT_COMMITTER_EMAIL'] = 'abhinavkumarrath2@gmail.com'

# We'll use git commit --amend for all commits by doing an interactive rebase with a sequence editor
script = """
import sys
with open(sys.argv[1], 'r') as f:
    lines = f.readlines()
with open(sys.argv[1], 'w') as f:
    for line in lines:
        if line.startswith('pick '):
            f.write(line)
            f.write('exec git commit --amend --no-edit --author="abhinavkumarrath <abhinavkumarrath2@gmail.com>"\\n')
        else:
            f.write(line)
"""

with open('seq_editor.py', 'w') as f:
    f.write(script)

# Run rebase
os.environ['GIT_SEQUENCE_EDITOR'] = 'python seq_editor.py'
subprocess.run(['git', 'rebase', '-i', '--root'])

# Clean up
os.remove('seq_editor.py')

# Force push
subprocess.run(['git', 'push', '--force', 'origin', 'main'])
