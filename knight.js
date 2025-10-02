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
    }
    origin = Node(origin);
    
    breadthResult = breadthTravel(origin, destination);
    for (let i=0; i<breadthResult[0].length; i++){
        console.log("Knight moves: "+breadthResult[0][i])
    }
    console.log("Number of moves: "+breadthResult[1])




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
        let moves = [];
        let numOfMoves = 0
        while (queue.length !== 0){
            let curr = queue.shift();
            for(let possibleMove of curr.getEdges()){
                let foundAdjacent = bestCase(possibleMove, targetNode);
                if (foundAdjacent){
                    moves.push(foundAdjacent);
                    moves.push(targetNode.getVertex());
                    return [moves, numOfMoves];
                }
                if(!JSON.stringify(tried).includes(possibleMove)) queue.push(Node(possibleMove));
                tried.push(possibleMove);
            }
            moves.push(curr.getVertex());
            numOfMoves++;
        }
    }
}

function Node(input){
    let [x, y] = input;
    let _vertex = input;
    let _edges = generateEdges();

    const getVertex = () =>{return _vertex;}

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
        getEdges
    }
}
let start = [0, 0];
let end = [7, 7];
knightMoves(start, end)