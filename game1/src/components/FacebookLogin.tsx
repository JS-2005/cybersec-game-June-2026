"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";

export default function FacebookLogin({
  title,
  onLogin,
}: {
  title: string;
  onLogin?: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(e);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <Image
          src="/images/facebook.svg"
          alt="facebook_blue_image"
          width={300}
          height={100}
        />
        <h2>{title}</h2>
      </div>

      <div className="right">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email address or phone number"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <button type="submit" className="btn">
              Log in
            </button>
            <Link href="#">Forgotten password?</Link>
            <button type="button" className="btn green">
              Create new account
            </button>
          </form>
        </div>

        <p>
          <strong>
            <Link href="#">Create a page</Link>
          </strong>{" "}
          for a celebrity, brand or business
        </p>
      </div>
    </div>
  );
}
