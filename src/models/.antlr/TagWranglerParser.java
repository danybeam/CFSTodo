// Generated from d:/src/CFSTodo/src/models/TagWrangler.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class TagWranglerParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		OPCODE=1, NOT=2, AND=3, OR=4, LPAREN=5, RPAREN=6, ANY=7, ALL=8, INPUT=9, 
		WS=10;
	public static final int
		RULE_expr = 0, RULE_unary = 1, RULE_innerUnary = 2, RULE_binary = 3, RULE_innerBinary = 4;
	private static String[] makeRuleNames() {
		return new String[] {
			"expr", "unary", "innerUnary", "binary", "innerBinary"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, "'not'", "'and'", "'or'", "'('", "')'", "'any'", "'all'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "OPCODE", "NOT", "AND", "OR", "LPAREN", "RPAREN", "ANY", "ALL", 
			"INPUT", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "TagWrangler.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public TagWranglerParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExprContext extends ParserRuleContext {
		public List<BinaryContext> binary() {
			return getRuleContexts(BinaryContext.class);
		}
		public BinaryContext binary(int i) {
			return getRuleContext(BinaryContext.class,i);
		}
		public List<UnaryContext> unary() {
			return getRuleContexts(UnaryContext.class);
		}
		public UnaryContext unary(int i) {
			return getRuleContext(UnaryContext.class,i);
		}
		public List<TerminalNode> AND() { return getTokens(TagWranglerParser.AND); }
		public TerminalNode AND(int i) {
			return getToken(TagWranglerParser.AND, i);
		}
		public List<TerminalNode> OR() { return getTokens(TagWranglerParser.OR); }
		public TerminalNode OR(int i) {
			return getToken(TagWranglerParser.OR, i);
		}
		public ExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr; }
	}

	public final ExprContext expr() throws RecognitionException {
		ExprContext _localctx = new ExprContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_expr);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(12);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				{
				setState(10);
				binary();
				}
				break;
			case 2:
				{
				setState(11);
				unary();
				}
				break;
			}
			setState(21);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==AND || _la==OR) {
				{
				{
				setState(14);
				_la = _input.LA(1);
				if ( !(_la==AND || _la==OR) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(17);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
				case 1:
					{
					setState(15);
					binary();
					}
					break;
				case 2:
					{
					setState(16);
					unary();
					}
					break;
				}
				}
				}
				setState(23);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class UnaryContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(TagWranglerParser.LPAREN, 0); }
		public InnerUnaryContext innerUnary() {
			return getRuleContext(InnerUnaryContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(TagWranglerParser.RPAREN, 0); }
		public TerminalNode ANY() { return getToken(TagWranglerParser.ANY, 0); }
		public TerminalNode ALL() { return getToken(TagWranglerParser.ALL, 0); }
		public UnaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unary; }
	}

	public final UnaryContext unary() throws RecognitionException {
		UnaryContext _localctx = new UnaryContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_unary);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(24);
			_la = _input.LA(1);
			if ( !(_la==ANY || _la==ALL) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(25);
			match(LPAREN);
			setState(26);
			innerUnary();
			setState(27);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InnerUnaryContext extends ParserRuleContext {
		public TerminalNode OPCODE() { return getToken(TagWranglerParser.OPCODE, 0); }
		public TerminalNode INPUT() { return getToken(TagWranglerParser.INPUT, 0); }
		public TerminalNode NOT() { return getToken(TagWranglerParser.NOT, 0); }
		public InnerUnaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_innerUnary; }
	}

	public final InnerUnaryContext innerUnary() throws RecognitionException {
		InnerUnaryContext _localctx = new InnerUnaryContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_innerUnary);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(30);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NOT) {
				{
				setState(29);
				match(NOT);
				}
			}

			setState(32);
			match(OPCODE);
			setState(33);
			match(INPUT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BinaryContext extends ParserRuleContext {
		public InnerBinaryContext innerBinary() {
			return getRuleContext(InnerBinaryContext.class,0);
		}
		public TerminalNode LPAREN() { return getToken(TagWranglerParser.LPAREN, 0); }
		public TerminalNode RPAREN() { return getToken(TagWranglerParser.RPAREN, 0); }
		public BinaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_binary; }
	}

	public final BinaryContext binary() throws RecognitionException {
		BinaryContext _localctx = new BinaryContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_binary);
		try {
			setState(40);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ANY:
			case ALL:
				enterOuterAlt(_localctx, 1);
				{
				setState(35);
				innerBinary();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 2);
				{
				setState(36);
				match(LPAREN);
				setState(37);
				innerBinary();
				setState(38);
				match(RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class InnerBinaryContext extends ParserRuleContext {
		public List<UnaryContext> unary() {
			return getRuleContexts(UnaryContext.class);
		}
		public UnaryContext unary(int i) {
			return getRuleContext(UnaryContext.class,i);
		}
		public List<TerminalNode> AND() { return getTokens(TagWranglerParser.AND); }
		public TerminalNode AND(int i) {
			return getToken(TagWranglerParser.AND, i);
		}
		public List<TerminalNode> OR() { return getTokens(TagWranglerParser.OR); }
		public TerminalNode OR(int i) {
			return getToken(TagWranglerParser.OR, i);
		}
		public InnerBinaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_innerBinary; }
	}

	public final InnerBinaryContext innerBinary() throws RecognitionException {
		InnerBinaryContext _localctx = new InnerBinaryContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_innerBinary);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(42);
			unary();
			setState(47);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(43);
					_la = _input.LA(1);
					if ( !(_la==AND || _la==OR) ) {
					_errHandler.recoverInline(this);
					}
					else {
						if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
						_errHandler.reportMatch(this);
						consume();
					}
					setState(44);
					unary();
					}
					} 
				}
				setState(49);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\u0004\u0001\n3\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0001"+
		"\u0000\u0001\u0000\u0003\u0000\r\b\u0000\u0001\u0000\u0001\u0000\u0001"+
		"\u0000\u0003\u0000\u0012\b\u0000\u0005\u0000\u0014\b\u0000\n\u0000\f\u0000"+
		"\u0017\t\u0000\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0002\u0003\u0002\u001f\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003"+
		")\b\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0005\u0004.\b\u0004\n\u0004"+
		"\f\u00041\t\u0004\u0001\u0004\u0000\u0000\u0005\u0000\u0002\u0004\u0006"+
		"\b\u0000\u0002\u0001\u0000\u0003\u0004\u0001\u0000\u0007\b3\u0000\f\u0001"+
		"\u0000\u0000\u0000\u0002\u0018\u0001\u0000\u0000\u0000\u0004\u001e\u0001"+
		"\u0000\u0000\u0000\u0006(\u0001\u0000\u0000\u0000\b*\u0001\u0000\u0000"+
		"\u0000\n\r\u0003\u0006\u0003\u0000\u000b\r\u0003\u0002\u0001\u0000\f\n"+
		"\u0001\u0000\u0000\u0000\f\u000b\u0001\u0000\u0000\u0000\r\u0015\u0001"+
		"\u0000\u0000\u0000\u000e\u0011\u0007\u0000\u0000\u0000\u000f\u0012\u0003"+
		"\u0006\u0003\u0000\u0010\u0012\u0003\u0002\u0001\u0000\u0011\u000f\u0001"+
		"\u0000\u0000\u0000\u0011\u0010\u0001\u0000\u0000\u0000\u0012\u0014\u0001"+
		"\u0000\u0000\u0000\u0013\u000e\u0001\u0000\u0000\u0000\u0014\u0017\u0001"+
		"\u0000\u0000\u0000\u0015\u0013\u0001\u0000\u0000\u0000\u0015\u0016\u0001"+
		"\u0000\u0000\u0000\u0016\u0001\u0001\u0000\u0000\u0000\u0017\u0015\u0001"+
		"\u0000\u0000\u0000\u0018\u0019\u0007\u0001\u0000\u0000\u0019\u001a\u0005"+
		"\u0005\u0000\u0000\u001a\u001b\u0003\u0004\u0002\u0000\u001b\u001c\u0005"+
		"\u0006\u0000\u0000\u001c\u0003\u0001\u0000\u0000\u0000\u001d\u001f\u0005"+
		"\u0002\u0000\u0000\u001e\u001d\u0001\u0000\u0000\u0000\u001e\u001f\u0001"+
		"\u0000\u0000\u0000\u001f \u0001\u0000\u0000\u0000 !\u0005\u0001\u0000"+
		"\u0000!\"\u0005\t\u0000\u0000\"\u0005\u0001\u0000\u0000\u0000#)\u0003"+
		"\b\u0004\u0000$%\u0005\u0005\u0000\u0000%&\u0003\b\u0004\u0000&\'\u0005"+
		"\u0006\u0000\u0000\')\u0001\u0000\u0000\u0000(#\u0001\u0000\u0000\u0000"+
		"($\u0001\u0000\u0000\u0000)\u0007\u0001\u0000\u0000\u0000*/\u0003\u0002"+
		"\u0001\u0000+,\u0007\u0000\u0000\u0000,.\u0003\u0002\u0001\u0000-+\u0001"+
		"\u0000\u0000\u0000.1\u0001\u0000\u0000\u0000/-\u0001\u0000\u0000\u0000"+
		"/0\u0001\u0000\u0000\u00000\t\u0001\u0000\u0000\u00001/\u0001\u0000\u0000"+
		"\u0000\u0006\f\u0011\u0015\u001e(/";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}