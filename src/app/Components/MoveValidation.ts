const number_of_columns = 8;


export const CheckValidMove= 
    (prevIndex:number, 
    index:number,
    pieceType: string,
    isBlack:Boolean,
    targetSquare:Number[],
    setTargetSquare:React.Dispatch<React.SetStateAction<Number[]>>):Boolean =>{
 const  X1= Math.floor(prevIndex / number_of_columns);
 const Y1 = prevIndex % number_of_columns;
 const  X2 = Math.floor(index / number_of_columns);
 const Y2 = index % number_of_columns;
 console.log('before',X1, Y1);
 console.log('after',X2, Y2);
console.log(pieceType);



 switch(pieceType){
    case 'r':
        return (X1 === X2 || Y1 === Y2);
    case 'b':
        return (Math.abs(X1 - X2) === Math.abs(Y1 - Y2));
    case 'q':
        return (X1 === X2 || Y1 === Y2 || Math.abs(X1 - X2) === Math.abs(Y1 - Y2));
    case 'k':
        return (Math.abs(X1 - X2) <= 1 && Math.abs(Y1 - Y2) <= 1);
    case 'n':
        return (Math.abs(X1 - X2) === 2 && Math.abs(Y1 - Y2) === 1 || Math.abs(X1 - X2) === 1 && Math.abs(Y1 - Y2) === 2);
 }
 if(isBlack){
    if(X1 === 1&& X2>X1) return X2 - X1 <=2 && Y2 === Y1
    return X2 - X1 ===1 && Y2 === Y1
 }
 else{
    if(X1 === 6 && X1 - X2 <=2 && Y2 === Y1 && X2<X1) {console.log(X1,Y1,X2,Y2); return true;}
    return X1 - X2 ===1 && Y2 === Y1
 }
}


export const FindTargetSquares = ( 
    targetSquare:Number[],
    setTargetSquare:React.Dispatch<React.SetStateAction<Number[]>>,
    pieceType:string,isBlack:Boolean,
    index:number,
    blackPosition:any,
    whitePosition:any) =>{
        setTargetSquare([]);
        if(!pieceType) return null;

        let temp:Number[] = targetSquare;
        
        const  X1= Math.floor(index / number_of_columns);
        const Y1 = index % number_of_columns;
        
        let Blockwhite:number[]= [];
        let Blockblack:number[][]= [];

    for(let i=0;i<64;i++){
           
         const  X2:number= Math.floor(i/ number_of_columns);
        const Y2:number = i % number_of_columns;
            
            switch(pieceType){
                case 'r':
                    if(X1 === X2 || Y1 === Y2)
                        {
                        
                        if(whitePosition[i]  )  Blockwhite.push(i);
                        if(blackPosition[i]  )  Blockblack.push([X2,Y2]);

                            temp = TargetSetter(X2,Y2,temp);console.log(X2,Y2); 
                        }
                        break;
                case 'b':
                    if(Math.abs(X1 - X2) === Math.abs(Y1 - Y2)){
                           temp = TargetSetter(X2,Y2,temp); console.log(X2,Y2);
                        }
                    break;
                case 'q':
                    if(X1 === X2 || Y1 === Y2 || Math.abs(X1 - X2) === Math.abs(Y1 - Y2)){
                           temp = TargetSetter(X2,Y2,temp); console.log(X2,Y2);
                        }
                    break;
                case 'k':
                    if(Math.abs(X1 - X2) <= 1 && Math.abs(Y1 - Y2) <= 1){
                           temp = TargetSetter(X2,Y2,temp); console.log(X2,Y2);
                        }
                    break;
                case 'n':
                    if(Math.abs(X1 - X2) === 2 && Math.abs(Y1 - Y2) === 1 || Math.abs(X1 - X2) === 1 && Math.abs(Y1 - Y2) === 2){
                           temp = TargetSetter(X2,Y2,temp);console.log(X2,Y2); 
                    }
                break;
             }
              if(isBlack && pieceType === 'p'){
                    if(X1 === 1 && X2 - X1 <=2 && Y2 === Y1 && X2>X1){
                        temp = TargetSetter(X2,Y2,temp);
                    }
                    else if(X2 - X1 ===1 && Y2 === Y1){
                        temp = TargetSetter(X2,Y2,temp);
                    }
                }
                else if(pieceType === 'p'){
                    if(X1 === 6 && X2 - X1 >=-2 && Y2 === Y1 && X2<X1){
                        temp = TargetSetter(X2,Y2,temp);
                    }
                    else if(X2 - X1 ===-1 && Y2 === Y1){
                        temp = TargetSetter(X2,Y2,temp);
                    }
                }
        // console.log('Block',Block);
        }
        // if(pieceType === 'r')temp = RookEval(X1,Y1,Block,temp);
        temp = RookEval(X1,Y1,Blockwhite,temp);
        console.log('temp',temp);
        // temp.push(index);
        setTargetSquare(temp);

    
}

const TargetSetter = (x:number,y:number,temp:Number[]):Number[]=>{
    const index = x* 8 + y;
    temp.push(index);
    return temp
}

const RookEval = (X1:number,Y1:number,Blockwhite:number[],temp:any)=>{
    
    const set = new Set(temp);
    let subArr:any = [];
    let newArr:any = [];
    set.forEach( a =>{
        subArr.push(a);
    })
    
    let Eval = EvalFunction(X1,Y1,subArr);
    console.log('Eval',Eval);
    let top:number[][] =[];
    let bottom:number[][] =[];
    let left:number[][]=[];
    let right:number[][] =[];

    Eval.forEach( (a,idx) =>{
        if(a[1]=== -8){
            top = Eval.splice(0,idx+1).reverse();
        }
    });
    Eval.forEach( (a,idx) =>{
        if(a[1]=== -1){
            right = Eval.splice(0,idx+1).reverse();
        }
    });
    Eval.reverse();
    Eval.forEach( (a,idx) =>{
        if(a[1]=== 8){
            bottom = Eval.splice(0,idx+1).reverse();
        }
    });
    Eval.forEach( (a,idx) =>{
        if(a[1]=== 1){
            left = Eval.splice(0,idx+1).reverse();
        }
    });

    console.log('eval',Eval );
    console.log('t',top);
    console.log('r',right);
    console.log('l',left);
    console.log('b',bottom);
    
    for (const a of top) {
        if (Blockwhite.includes(a[0])) break;
        newArr.push(a[0]);
    }
    for (const a of right) {
        if (Blockwhite.includes(a[0])) break;
        newArr.push(a[0]);
    }
    for (const a of left) {
        if (Blockwhite.includes(a[0])) break;
        newArr.push(a[0]);
    }
    for (const a of bottom) {
        if (Blockwhite.includes(a[0])) break;
        newArr.push(a[0]);
    }

    console.log('newArr',newArr);

    return newArr;
}

const blockincludes = ()=>{

}

const EvalFunction = (X1:number,Y1:number,newArr:any)=>{

    let Eval:number[][] =[];
    // let Eval:{[id:number]:number} ={};
    newArr.map( (a:any,index:any) => {
        const [x,y] = RankToMatrix(a);
        const z = MatrixToRank((x-X1),(y-Y1));
        Eval.push([a,z]);
    });
    return Eval;
}


const RankToMatrix = (rank:number):number[] =>{
    const  X1= Math.floor(rank / number_of_columns);
    const Y1 = rank % number_of_columns;
    return [X1, Y1];
}

const MatrixToRank = (X1:number,Y1:number):number =>{
    return X1 * number_of_columns + Y1;
}