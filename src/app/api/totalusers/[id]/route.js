import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET(req , {params}) {
    const {id} = params;
    await connectMongoDB();
    const user = await User.findOne({_id: id});
    return NextResponse.json({user}, {status: 200});
}

export async function PUT(req , {params}) {
    const {id} = params;
    const {newName: name , newEmail: email , newPass: password} = await req.json();
    const hasedPass = await bcrypt.hash(password , 10);
    await connectMongoDB();
    await User.findByIdAndUpdate(id, {name , email , password:hasedPass});
    return NextResponse.json({message: "User updated"} , {status: 200});
}