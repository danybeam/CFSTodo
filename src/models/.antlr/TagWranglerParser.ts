// Generated from ./src/models/TagWrangler.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import TagWranglerVisitor from "./TagWranglerVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class TagWranglerParser extends Parser {
	public static readonly OPCODE = 1;
	public static readonly NOT = 2;
	public static readonly AND = 3;
	public static readonly OR = 4;
	public static readonly LPAREN = 5;
	public static readonly RPAREN = 6;
	public static readonly ANY = 7;
	public static readonly ALL = 8;
	public static readonly INPUT = 9;
	public static readonly WS = 10;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_expr = 0;
	public static readonly RULE_unary = 1;
	public static readonly RULE_innerUnary = 2;
	public static readonly RULE_binary = 3;
	public static readonly RULE_innerBinary = 4;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            "'not'", "'and'", 
                                                            "'or'", "'('", 
                                                            "')'", "'any'", 
                                                            "'all'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "OPCODE", 
                                                             "NOT", "AND", 
                                                             "OR", "LPAREN", 
                                                             "RPAREN", "ANY", 
                                                             "ALL", "INPUT", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"expr", "unary", "innerUnary", "binary", "innerBinary",
	];
	public get grammarFileName(): string { return "TagWrangler.g4"; }
	public get literalNames(): (string | null)[] { return TagWranglerParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return TagWranglerParser.symbolicNames; }
	public get ruleNames(): string[] { return TagWranglerParser.ruleNames; }
	public get serializedATN(): number[] { return TagWranglerParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, TagWranglerParser._ATN, TagWranglerParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public expr(): ExprContext {
		let localctx: ExprContext = new ExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, TagWranglerParser.RULE_expr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 12;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				this.state = 10;
				this.binary();
				}
				break;
			case 2:
				{
				this.state = 11;
				this.unary();
				}
				break;
			}
			this.state = 21;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===3 || _la===4) {
				{
				{
				this.state = 14;
				_la = this._input.LA(1);
				if(!(_la===3 || _la===4)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 17;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
				case 1:
					{
					this.state = 15;
					this.binary();
					}
					break;
				case 2:
					{
					this.state = 16;
					this.unary();
					}
					break;
				}
				}
				}
				this.state = 23;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public unary(): UnaryContext {
		let localctx: UnaryContext = new UnaryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, TagWranglerParser.RULE_unary);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 24;
			_la = this._input.LA(1);
			if(!(_la===7 || _la===8)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 25;
			this.match(TagWranglerParser.LPAREN);
			this.state = 26;
			this.innerUnary();
			this.state = 27;
			this.match(TagWranglerParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public innerUnary(): InnerUnaryContext {
		let localctx: InnerUnaryContext = new InnerUnaryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, TagWranglerParser.RULE_innerUnary);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 30;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2) {
				{
				this.state = 29;
				this.match(TagWranglerParser.NOT);
				}
			}

			this.state = 32;
			this.match(TagWranglerParser.OPCODE);
			this.state = 33;
			this.match(TagWranglerParser.INPUT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public binary(): BinaryContext {
		let localctx: BinaryContext = new BinaryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, TagWranglerParser.RULE_binary);
		try {
			this.state = 40;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 7:
			case 8:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 35;
				this.innerBinary();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 36;
				this.match(TagWranglerParser.LPAREN);
				this.state = 37;
				this.innerBinary();
				this.state = 38;
				this.match(TagWranglerParser.RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public innerBinary(): InnerBinaryContext {
		let localctx: InnerBinaryContext = new InnerBinaryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, TagWranglerParser.RULE_innerBinary);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 42;
			this.unary();
			this.state = 47;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 43;
					_la = this._input.LA(1);
					if(!(_la===3 || _la===4)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					this.state = 44;
					this.unary();
					}
					}
				}
				this.state = 49;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,10,51,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,1,0,3,0,13,8,0,1,0,1,0,1,0,3,0,18,8,0,
	5,0,20,8,0,10,0,12,0,23,9,0,1,1,1,1,1,1,1,1,1,1,1,2,3,2,31,8,2,1,2,1,2,
	1,2,1,3,1,3,1,3,1,3,1,3,3,3,41,8,3,1,4,1,4,1,4,5,4,46,8,4,10,4,12,4,49,
	9,4,1,4,0,0,5,0,2,4,6,8,0,2,1,0,3,4,1,0,7,8,51,0,12,1,0,0,0,2,24,1,0,0,
	0,4,30,1,0,0,0,6,40,1,0,0,0,8,42,1,0,0,0,10,13,3,6,3,0,11,13,3,2,1,0,12,
	10,1,0,0,0,12,11,1,0,0,0,13,21,1,0,0,0,14,17,7,0,0,0,15,18,3,6,3,0,16,18,
	3,2,1,0,17,15,1,0,0,0,17,16,1,0,0,0,18,20,1,0,0,0,19,14,1,0,0,0,20,23,1,
	0,0,0,21,19,1,0,0,0,21,22,1,0,0,0,22,1,1,0,0,0,23,21,1,0,0,0,24,25,7,1,
	0,0,25,26,5,5,0,0,26,27,3,4,2,0,27,28,5,6,0,0,28,3,1,0,0,0,29,31,5,2,0,
	0,30,29,1,0,0,0,30,31,1,0,0,0,31,32,1,0,0,0,32,33,5,1,0,0,33,34,5,9,0,0,
	34,5,1,0,0,0,35,41,3,8,4,0,36,37,5,5,0,0,37,38,3,8,4,0,38,39,5,6,0,0,39,
	41,1,0,0,0,40,35,1,0,0,0,40,36,1,0,0,0,41,7,1,0,0,0,42,47,3,2,1,0,43,44,
	7,0,0,0,44,46,3,2,1,0,45,43,1,0,0,0,46,49,1,0,0,0,47,45,1,0,0,0,47,48,1,
	0,0,0,48,9,1,0,0,0,49,47,1,0,0,0,6,12,17,21,30,40,47];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!TagWranglerParser.__ATN) {
			TagWranglerParser.__ATN = new ATNDeserializer().deserialize(TagWranglerParser._serializedATN);
		}

		return TagWranglerParser.__ATN;
	}


	static DecisionsToDFA = TagWranglerParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ExprContext extends ParserRuleContext {
	constructor(parser?: TagWranglerParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public binary_list(): BinaryContext[] {
		return this.getTypedRuleContexts(BinaryContext) as BinaryContext[];
	}
	public binary(i: number): BinaryContext {
		return this.getTypedRuleContext(BinaryContext, i) as BinaryContext;
	}
	public unary_list(): UnaryContext[] {
		return this.getTypedRuleContexts(UnaryContext) as UnaryContext[];
	}
	public unary(i: number): UnaryContext {
		return this.getTypedRuleContext(UnaryContext, i) as UnaryContext;
	}
	public AND_list(): TerminalNode[] {
	    	return this.getTokens(TagWranglerParser.AND);
	}
	public AND(i: number): TerminalNode {
		return this.getToken(TagWranglerParser.AND, i);
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(TagWranglerParser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(TagWranglerParser.OR, i);
	}
    public get ruleIndex(): number {
    	return TagWranglerParser.RULE_expr;
	}
	// @Override
	public accept<Result>(visitor: TagWranglerVisitor<Result>): Result {
		if (visitor.visitExpr) {
			return visitor.visitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnaryContext extends ParserRuleContext {
	constructor(parser?: TagWranglerParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(TagWranglerParser.LPAREN, 0);
	}
	public innerUnary(): InnerUnaryContext {
		return this.getTypedRuleContext(InnerUnaryContext, 0) as InnerUnaryContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(TagWranglerParser.RPAREN, 0);
	}
	public ANY(): TerminalNode {
		return this.getToken(TagWranglerParser.ANY, 0);
	}
	public ALL(): TerminalNode {
		return this.getToken(TagWranglerParser.ALL, 0);
	}
    public get ruleIndex(): number {
    	return TagWranglerParser.RULE_unary;
	}
	// @Override
	public accept<Result>(visitor: TagWranglerVisitor<Result>): Result {
		if (visitor.visitUnary) {
			return visitor.visitUnary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InnerUnaryContext extends ParserRuleContext {
	constructor(parser?: TagWranglerParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPCODE(): TerminalNode {
		return this.getToken(TagWranglerParser.OPCODE, 0);
	}
	public INPUT(): TerminalNode {
		return this.getToken(TagWranglerParser.INPUT, 0);
	}
	public NOT(): TerminalNode {
		return this.getToken(TagWranglerParser.NOT, 0);
	}
    public get ruleIndex(): number {
    	return TagWranglerParser.RULE_innerUnary;
	}
	// @Override
	public accept<Result>(visitor: TagWranglerVisitor<Result>): Result {
		if (visitor.visitInnerUnary) {
			return visitor.visitInnerUnary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BinaryContext extends ParserRuleContext {
	constructor(parser?: TagWranglerParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public innerBinary(): InnerBinaryContext {
		return this.getTypedRuleContext(InnerBinaryContext, 0) as InnerBinaryContext;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(TagWranglerParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(TagWranglerParser.RPAREN, 0);
	}
    public get ruleIndex(): number {
    	return TagWranglerParser.RULE_binary;
	}
	// @Override
	public accept<Result>(visitor: TagWranglerVisitor<Result>): Result {
		if (visitor.visitBinary) {
			return visitor.visitBinary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InnerBinaryContext extends ParserRuleContext {
	constructor(parser?: TagWranglerParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public unary_list(): UnaryContext[] {
		return this.getTypedRuleContexts(UnaryContext) as UnaryContext[];
	}
	public unary(i: number): UnaryContext {
		return this.getTypedRuleContext(UnaryContext, i) as UnaryContext;
	}
	public AND_list(): TerminalNode[] {
	    	return this.getTokens(TagWranglerParser.AND);
	}
	public AND(i: number): TerminalNode {
		return this.getToken(TagWranglerParser.AND, i);
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(TagWranglerParser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(TagWranglerParser.OR, i);
	}
    public get ruleIndex(): number {
    	return TagWranglerParser.RULE_innerBinary;
	}
	// @Override
	public accept<Result>(visitor: TagWranglerVisitor<Result>): Result {
		if (visitor.visitInnerBinary) {
			return visitor.visitInnerBinary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
