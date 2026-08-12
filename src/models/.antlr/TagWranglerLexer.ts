// Generated from ./src/models/TagWrangler.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class TagWranglerLexer extends Lexer {
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
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
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
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"OPCODE", "NOT", "AND", "OR", "LPAREN", "RPAREN", "ANY", "ALL", "INPUT", 
		"WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, TagWranglerLexer._ATN, TagWranglerLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "TagWrangler.g4"; }

	public get literalNames(): (string | null)[] { return TagWranglerLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return TagWranglerLexer.symbolicNames; }
	public get ruleNames(): string[] { return TagWranglerLexer.ruleNames; }

	public get serializedATN(): number[] { return TagWranglerLexer._serializedATN; }

	public get channelNames(): string[] { return TagWranglerLexer.channelNames; }

	public get modeNames(): string[] { return TagWranglerLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,10,73,6,-1,2,0,7,
	0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,
	9,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,0,37,8,
	0,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,4,1,4,1,5,1,5,1,6,1,6,1,
	6,1,6,1,7,1,7,1,7,1,7,1,8,4,8,63,8,8,11,8,12,8,64,1,9,4,9,68,8,9,11,9,12,
	9,69,1,9,1,9,0,0,10,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,1,0,2,
	5,0,45,45,47,57,65,90,95,95,97,122,3,0,9,10,13,13,32,32,76,0,1,1,0,0,0,
	0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,
	0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,1,36,1,0,0,0,3,38,1,0,0,0,5,42,
	1,0,0,0,7,46,1,0,0,0,9,49,1,0,0,0,11,51,1,0,0,0,13,53,1,0,0,0,15,57,1,0,
	0,0,17,62,1,0,0,0,19,67,1,0,0,0,21,22,5,104,0,0,22,23,5,97,0,0,23,37,5,
	115,0,0,24,25,5,105,0,0,25,37,5,115,0,0,26,27,5,115,0,0,27,28,5,116,0,0,
	28,29,5,97,0,0,29,30,5,114,0,0,30,31,5,116,0,0,31,32,5,115,0,0,32,33,5,
	87,0,0,33,34,5,105,0,0,34,35,5,116,0,0,35,37,5,104,0,0,36,21,1,0,0,0,36,
	24,1,0,0,0,36,26,1,0,0,0,37,2,1,0,0,0,38,39,5,110,0,0,39,40,5,111,0,0,40,
	41,5,116,0,0,41,4,1,0,0,0,42,43,5,97,0,0,43,44,5,110,0,0,44,45,5,100,0,
	0,45,6,1,0,0,0,46,47,5,111,0,0,47,48,5,114,0,0,48,8,1,0,0,0,49,50,5,40,
	0,0,50,10,1,0,0,0,51,52,5,41,0,0,52,12,1,0,0,0,53,54,5,97,0,0,54,55,5,110,
	0,0,55,56,5,121,0,0,56,14,1,0,0,0,57,58,5,97,0,0,58,59,5,108,0,0,59,60,
	5,108,0,0,60,16,1,0,0,0,61,63,7,0,0,0,62,61,1,0,0,0,63,64,1,0,0,0,64,62,
	1,0,0,0,64,65,1,0,0,0,65,18,1,0,0,0,66,68,7,1,0,0,67,66,1,0,0,0,68,69,1,
	0,0,0,69,67,1,0,0,0,69,70,1,0,0,0,70,71,1,0,0,0,71,72,6,9,0,0,72,20,1,0,
	0,0,4,0,36,64,69,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!TagWranglerLexer.__ATN) {
			TagWranglerLexer.__ATN = new ATNDeserializer().deserialize(TagWranglerLexer._serializedATN);
		}

		return TagWranglerLexer.__ATN;
	}


	static DecisionsToDFA = TagWranglerLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}