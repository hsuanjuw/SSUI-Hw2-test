[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8612381&assignment_repo_type=AssignmentRepo)
## SSUI HW2

**Name:** Phoebe(Hsuan-Ju) Wang

**Andrew ID:** hsuanjuw

**GitHub Pages:** `https://cmu-ssui-fall2022.github.io/hw2-hsuanjuw/`

**GitHub Repo:** `https://github.com/CMU-SSUI-Fall2022/hw2-hsuanjuw`

**Description of design:** 
- some global variables to record the mode (dbclick,mouseMoved, etc.)
- some global variables to record value  (mouse_x, mouse_y, selectedDiv, draggedDiv,  draggedDivOffset_x, draggedDivOffset_y, etc. )
- Mouse Events add to target Divs:
    - click: if mouse not moving, change div color
    - mouse down: record mouse values, draggedDiv, selectedDiv
    - mouse up: set the recorded value to null
    - dblclick: set dbclick values 
- Mouse Events add to Workspace Divs:
    - mouse move: if draggedDiv not null or double clicked mode on, set div to follow the cursor.
    - click: set selectedDiv background color to red
    - keydown: implement esc function
- Touch Events design similar to mouse event. One major difference is : record the touch start time and end time in order to determine whether it is a double touch and a touchStarted to record whether there is already a finger touching

**Description of testing:**  Tried 6 divs.Tried 6 divs.
