import { pow, inv, multiply} from 'mathjs';

export const CalLinear=(x, fx, n)=>{
    let mA=[], mAinv=[], mB=[], mX=[], gX=[], output=[];

    console.log(x, fx)

    var sumx=0, sumx2=0, sumy=0, sumxy=0;
    for(let i=0;i<n;i++){
        sumx += x[i];
        sumx2 += pow(x[i],2);
        sumy += fx[i];
        sumxy += x[i]*fx[i];
    }
    console.log("sumx",sumx)
    console.log("sumy = ",sumy)
    console.log("sumx2 = ",sumx2)
    console.log("sumxy = ",sumxy)

    mA = [[n, sumx],[sumx, sumx2]]
    mAinv = inv(mA)

    mB = [sumy, sumxy]
    mX = multiply(mAinv, mB)

    console.log("ma = ",mA)
    console.log("mb = ",mB)
    console.log("mx = ",mX)
    console.log("mAinv = ",mAinv)

    for(let i=0;i<n;i++){
        gX[i] = mX[0]+(mX[1]*x[i]);
        console.log(gX[i])
    }
    output.push({mX, gX})
    console.log(gX, output)
    return{gxnew: gX, outputnew:output}
}