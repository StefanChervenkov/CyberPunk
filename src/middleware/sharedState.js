let sharedState = {};

export function shareState(ctx, next) {
    ctx.sharedState = shareState;
    next();
}