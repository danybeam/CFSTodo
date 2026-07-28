import { BinaryContext, ExprContext, ParenthContext, UnaryContext } from './.antlr/TagWranglerParser';
import TagWranglerVisitor from "./.antlr/TagWranglerVisitor";

export class TagVisitor extends TagWranglerVisitor<(input: string) => boolean> {

    visitExpr = (ctx: ExprContext) => {
        console.log("Expr");
        let newCtx: UnaryContext | BinaryContext | null = null;

        if ((newCtx = ctx.unary())) {
            return this.visitUnary(newCtx);
        }

        return this.visitBinary(ctx.binary());
    };

    visitParenth = (ctx: ParenthContext) => {
        console.log("Parenth");
        let newCtx: UnaryContext | BinaryContext | null = null;

        if ((newCtx = ctx.unary())) {
            return this.visitUnary(newCtx);
        }

        return this.visitBinary(ctx.binary());
    };

    visitBinary = (ctx: BinaryContext) => {
        // TODO check if unary or parenth context
        // TODO check children by pairs to compose more complex functions
        console.log("Binary");
        console.log(ctx.unary(0).getText())
        console.log(ctx.getChild(0) instanceof UnaryContext);
        console.log(ctx.getChild(1) instanceof UnaryContext);
        console.log(ctx.getChild(1).getText());
        console.log(ctx.getChild(2) instanceof UnaryContext);
        return (input: string) => false;
    };

    visitUnary = (ctx: UnaryContext) => {
        console.log("unary")
        //console.log(`visiting ${ctx}`);
        let input = ctx.INPUT().getText();

        let result = (i: string) => { return false; };
        let negate: boolean = ctx.NOT() != null;

        switch (ctx.OPCODE().getText()) {
            case "has":
                result = (ih: string) => { return negate !== ih.includes(input); };
                break;
            case "startsWith":
                result = (ih: string) => { return negate !== ih.startsWith(input); };
                break;
            case "is":
            default:
                result = (ih: string) => { return negate !== (ih == input); };

        }

        //console.log(ctx.INPUT());
        // console.log(ctx.OPCODE().getText());
        //console.log(ctx.NOT());
        return result;
    };
}