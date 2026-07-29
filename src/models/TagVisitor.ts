import { BinaryContext, ExprContext, InnerBinaryContext, InnerUnaryContext, UnaryContext } from './.antlr/TagWranglerParser';
import TagWranglerVisitor from "./.antlr/TagWranglerVisitor";

export class TagVisitor extends TagWranglerVisitor<boolean> {

    private _visitorContext?: string;

    public set visitorContext(v: string) {
        this._visitorContext = v;
    }


    visitExpr = (ctx: ExprContext) => {
        let left = false;
        let unaryCounter = 0;
        let binaryCounter = 0;
        if (ctx.getChild(0) instanceof BinaryContext) {
            left = this.visitBinary(ctx.binary(binaryCounter++));
        } else {
            left = this.visitUnary(ctx.unary(unaryCounter++));
        }

        for (let op = 1, input = 2; op < ctx.getChildCount() && input < ctx.getChildCount(); (op += 2, input += 2)) {
            let isOR = ctx.getChild(op).getText() == "or";
            // if isOR && left || !isOR && !left
            if (isOR == left) {
                break;
            }

            if (isOR) {
                left = left || ctx.getChild(input) instanceof UnaryContext ? this.visitUnary(ctx.unary(unaryCounter++)) : this.visitBinary(ctx.binary(binaryCounter++));
            } else {
                left = left && ctx.getChild(input) instanceof UnaryContext ? this.visitUnary(ctx.unary(unaryCounter++)) : this.visitBinary(ctx.binary(binaryCounter++));
            }
        }

        return left;
    };

    visitBinary = (ctx: BinaryContext) => {
        return this.visitInnerBinary(ctx.innerBinary());
    };

    visitInnerBinary = (ctx: InnerBinaryContext) => {
        if (ctx.OR()) {
            return this.visitUnary(ctx.unary(0)) || this.visitUnary(ctx.unary(1));
        }

        return this.visitUnary(ctx.unary(0)) && this.visitUnary(ctx.unary(1));
    };


    visitUnary = (ctx: UnaryContext) => {
        return this.visitInnerUnary(ctx.innerUnary());
    };

    visitInnerUnary = (ctx: InnerUnaryContext) => {
        let negate = ctx.NOT() != null;
        let result = false;

        switch (ctx.OPCODE().getText()) {
            case "has":
                result = this._visitorContext?.includes(ctx.INPUT().getText()) ?? false;
                break;
            case "startsWith":
                result = this._visitorContext?.startsWith(ctx.INPUT().getText()) ?? false;
                break;
            case "is":
            default:
                result = (this?._visitorContext ?? "") === ctx.INPUT().getText();
        }

        return result !== negate;
    };
}