import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/posts";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
    const {id} = params;
    await connectMongoDB();
    const post = await Post.findOne({_id: id});
    return NextResponse.json({post} , {status: 200});
}

export async function PUT(req, {params}) {
    const {id} = params;
    const {newtitle: title , newimg: img , newcontent: content} = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, {title , img , content});
    return NextResponse.json({message: "Post Update"}, {status: 200})
}