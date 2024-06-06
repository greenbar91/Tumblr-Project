import './AuthFormModal.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkLogin, thunkSignup, thunkCheckEmail } from '../../redux/session';

const AuthFormModal = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [errors, setErrors] = useState({});

    const { closeModal } = useModal();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const emailExists = await thunkCheckEmail({ email });
        setIsExistingUser(emailExists);
        setStep(2);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(thunkLogin({ email, password }));

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (step === 2) {
            if (password !== confirmPassword) {
                return setErrors({ confirmPassword: "Confirm Password field must be the same as the Password field" });
            }

            setStep(3);
            return;
        }

        const serverResponse = await dispatch(thunkSignup({ email, username, password }));

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    return (
        <>
            {/* <h1>{isExistingUser ? "Log In" : "Sign Up"}</h1> */}
            <form onSubmit={
                step === 1
                    ? handleEmailSubmit
                    : isExistingUser
                        ? handleLoginSubmit
                        : handleSignupSubmit
            }>
                {step === 1 && (
                    <>
                        <p>Enter your email to log in or register:</p>
                        <label>
                            Email
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        {errors.email && <p>{errors.email}</p>}
                        <button type="submit">Next</button>
                    </>
                )}
                {step === 2 && isExistingUser && (
                    <>
                        <p>Welcome back to your corner of the internet.</p>
                        <label>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        {errors.password && <p>{errors.password}</p>}
                        <button type="submit">Log In</button>
                    </>
                )}
                {step === 2 && !isExistingUser && (
                    <>
                        <p>Welcome to your corner of the internet. Glad you&apos;re here.</p>
                        <label>
                            Set a password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        {errors.password && <p>{errors.password}</p>}
                        <label>
                            Repeat password
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                        <button type="submit">Next</button>
                    </>
                )}
                {step === 3 && (
                    <>
                        <p>What should we call you?
                            This will be how you appear to others on your URL.
                            Don&apos;t worry, you can change this later.
                        </p>

                        <label>
                            @
                            <input
                                type="text"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        {errors.username && <p>{errors.username}</p>}
                        <button type="submit">Sign Up</button>
                    </>
                )}
            </form>
        </>
    );

};

export default AuthFormModal;
