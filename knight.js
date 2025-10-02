function knightMoves(origin, destination){
    if (origin.length !== 2 || destination.length !== 2) throw new Error("Please enter valid origin, destination. Ie. knightMoves([0,0],[1,2])");
    console.log("Knight starts at: "+origin+" with target: "+destination);
    if(JSON.stringify(origin) === JSON.stringify(destination)) {
        console.log("Knight didn't even move!");
        return;
    }
    destination = Node(destination);
    if (bestCase(origin, destination)){
        console.log("Knight moves to "+destination.getVertex())
        console.log("Reached Destination in 1 move!")
        return;
    }
    origin = Node(origin);
    
    breadthResult = breadthTravel(origin, destination);
    console.log(breadthResult);
    console.log("Number of moves: "+breadthResult.length);
    prettyPrint(breadthResult);




    function bestCase(currVertex, targetNode){
        for(let move of targetNode.getEdges()){
            if (JSON.stringify(move) === JSON.stringify(currVertex)){
                return move;
            };
        }
        return false;
    }

    function breadthTravel(currNode, targetNode){
        let queue = [currNode];
        let tried = [currNode.getVertex()];
        while (queue.length !== 0){
            let curr = queue.shift();
            for(let possibleMove of curr.getEdges()){
                let foundAdjacent = bestCase(possibleMove, targetNode);
                if (foundAdjacent) return backTrack(Node(possibleMove, curr));
                if(!JSON.stringify(tried).includes(possibleMove)) queue.push(Node(possibleMove, curr));
                tried.push(possibleMove);
            }
        }
    }

    function backTrack(foundNode){
        let path = [foundNode.getVertex(),destination.getVertex()];
        while (foundNode.getPrevious()){
            foundNode = foundNode.getPrevious();
            path.unshift(foundNode.getVertex());
        }
        return path;
    }

    function prettyPrint(path) {//vibe coded this shit
        const size = 8;
        // Create empty board
        let board = Array.from({ length: size }, () => Array(size).fill("_"));
        // Mark origin, path, destination
        path.forEach(([x, y], i) => {
            if (i === 0) board[y][x] = "O";           // origin
            else if (i === path.length - 1) board[y][x] = "X"; // destination
            else board[y][x] = i;                   // path
        });
        // Print the board
        for (let row of board) {
            console.log(row.join(" "));
        }
    }
}

function Node(input, previous){
    let [x, y] = input;
    let _vertex = input;
    let _previous = previous ?? null;
    let _edges = generateEdges();

    const getVertex = () =>{return _vertex;}

    const getPrevious = () =>{return _previous;}

    const getEdges = () => {return _edges;}

    function generateEdges(){
        let movement = [-2,-1,1,2]
        let moves = [];
        for (let xDif of movement){
            let yDif = 3 - Math.abs(xDif);
            if ((x+xDif) >= 0 && (y-yDif) >= 0 
            && (x+xDif) <= 7 && (y-yDif) <= 7) moves.push([x+xDif, y-yDif]);
            if ((x+xDif) >= 0 && (y+yDif) >= 0 
            && (x+xDif) <= 7 && (y+yDif) <= 7) moves.push([x+xDif, y+yDif]);         
        }
        return moves;
    }

    return {
        getVertex,
        getPrevious,
        getEdges
    }
}
let start = [0, 0];
let end = [7, 6];
knightMoves(start, end)