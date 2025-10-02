function knightMoves(origin, destination){
    if (origin.length !== 2 || destination.length !== 2) throw new Error("Please enter valid origin, destination. Ie. knightMoves([0,0],[1,2])");
    console.log("3 knights line up to race! Knight of the Level Order, Knight of the Pre Order, and Knight of the Post Order")
    console.log("Knights start at: "+origin+" with target: "+destination);
    if(JSON.stringify(origin) === JSON.stringify(destination)) {
        console.log("Knights didn't even move!");
        return;
    }
    destination = Node(destination);
    if (bestCase(origin, destination)){
        console.log("Knights moves to "+destination.getVertex())
        console.log("Reached Destination in 1 move and tied!")
        return;
    }
    origin = Node(origin);

    return results();

    function results(){
        let levelOrderPath = [];
        let preOrderPath = [];
        let postOrderPath = [];
        try{
            levelOrderPath = breadthTravel(origin, destination);
        } catch (error){
            console.log("Knight of the Level Order got lost! "+error);
            levelOrderPath.length = 99;
        }
        try{
            preOrderPath = preOrderTravel(origin, destination, []);
        } catch (error){
            console.log("Knight of the Pre Order got lost! "+error);
            preOrderPath.length = 99;
        }
        try{
            postOrderPath = postOrderTravel(origin, destination, []);
        } catch (error){
            console.log("Knight of the Post Order got lost! "+error);
            postOrderPath.length = 99;
        }
        if(levelOrderPath.length <= preOrderPath.length && levelOrderPath.length <= postOrderPath.length){
            //levelOrder victory
            console.log("Level Order Knight wins with "+(levelOrderPath.length-1)+" moves!");
            console.log(levelOrderPath);
            prettyPrint(levelOrderPath);
        }
        if(preOrderPath.length <= levelOrderPath.length && preOrderPath.length <= postOrderPath.length){
            //preOrder victory
            console.log("Pre Order Knight wins with "+(preOrderPath.length-1)+" moves!");
            console.log(preOrderPath);
            prettyPrint(preOrderPath);
        }
        if(postOrderPath.length <= levelOrderPath.length && postOrderPath.length <= preOrderPath){
            //postOrder Victory
            console.log("Post Order Knight wins with "+(postOrderPath.length-1)+" moves!");
            console.log(postOrderPath);
            prettyPrint(postOrderPath);
        }
    }

    function bestCase(currVertex, targetNode){
        for(let path of targetNode.getEdges()){
            if (JSON.stringify(path) === JSON.stringify(currVertex)){
                return path;
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

    function preOrderTravel(currNode, targetNode, tried){
        tried.push(currNode.getVertex());
        for (let possibleMove of currNode.getEdges()){
            let foundAdjacent = bestCase(possibleMove, targetNode);
            if (foundAdjacent) return backTrack(Node(possibleMove, currNode));
        }
        for (let possibleMove of currNode.getEdges()){
            if(!JSON.stringify(tried).includes(possibleMove)) return preOrderTravel(Node(possibleMove, currNode), targetNode, tried)
        }
    }

    function postOrderTravel(currNode, targetNode, tried){
        for (let possibleMove of currNode.getEdges()){
            if(!JSON.stringify(tried).includes(possibleMove)) return postOrderTravel(Node(possibleMove, currNode), targetNode, tried)
            tried.push(currNode.getVertex());
            let foundAdjacent = bestCase(possibleMove, targetNode);
            if (foundAdjacent) return backTrack(Node(possibleMove, currNode));
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

//driver script
let start = [0, 0];
let end = [7,7];
knightMoves(start, end);

// start = [6, 1];
// end = [7,7];
// knightMoves(start, end);