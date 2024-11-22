const baseUrl = 'http://localhost:3030';

export async function authenticateUser(email, password, action) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    try {
        const response = await fetch(`${baseUrl}/users/${action}`, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const data = await response.json();

        //TODO extract in a separate module// Store user data in localStorage 
        localStorage.setItem('_id', data._id);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('email', data.email);

        return data;

    } catch (error) {
        throw error;
    }
}

export function authMiddleware(ctx, next) {
    const user = {
        _id: localStorage.getItem('_id'),
        accessToken: localStorage.getItem('accessToken'),
        email: localStorage.getItem('email')
    }

    if (user.accessToken) {
        ctx.user = user;
    } else {
        ctx.user = null;
    }

    next();
}