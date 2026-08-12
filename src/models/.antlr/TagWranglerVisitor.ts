// Generated from ./src/models/TagWrangler.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { ExprContext } from "./TagWranglerParser.js";
import { UnaryContext } from "./TagWranglerParser.js";
import { InnerUnaryContext } from "./TagWranglerParser.js";
import { BinaryContext } from "./TagWranglerParser.js";
import { InnerBinaryContext } from "./TagWranglerParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `TagWranglerParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class TagWranglerVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `TagWranglerParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;
	/**
	 * Visit a parse tree produced by `TagWranglerParser.unary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnary?: (ctx: UnaryContext) => Result;
	/**
	 * Visit a parse tree produced by `TagWranglerParser.innerUnary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInnerUnary?: (ctx: InnerUnaryContext) => Result;
	/**
	 * Visit a parse tree produced by `TagWranglerParser.binary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary?: (ctx: BinaryContext) => Result;
	/**
	 * Visit a parse tree produced by `TagWranglerParser.innerBinary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInnerBinary?: (ctx: InnerBinaryContext) => Result;
}

