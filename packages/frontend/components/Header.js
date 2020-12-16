import React, { Fragment } from "react";
import Link from "next/link";
import { Menu, Layout, Avatar, Popover, Badge, List } from "antd";
import {
  BellOutlined,
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { useUser } from "../lib/user";

const { SubMenu } = Menu;

const Header = () => {
  const { user, loading } = useUser();

  const handleClickMenu = (e) => {
    // e.key === 'SignOut' && this.props.onSignOut()
    console.log("handleClickMenu");
  };

  console.log("user", user);

  return (
    <header>
      {/* <Menu key="user" mode="horizontal" onClick={handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                <>Hi,</>
              </span>
              <span>Brandon</span>
              <Avatar style={{ marginLeft: 8 }} src={avatar} />
            </Fragment>
          }
        >
          <Menu.Item key="SignOut">
            <>Sign out</>
          </Menu.Item>
        </SubMenu>
      </Menu>
      <Popover
        placement="bottomRight"
        trigger="click"
        key="notifications"
        getPopupContainer={() => document.querySelector('#primaryLayout')}
        content={
          <div>
          </div>
        }
      >
        <Badge
          count={0}
          dot
          offset={[-10, 10]}
        >
          <BellOutlined />
        </Badge>
      </Popover> */}
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          {!loading &&
            (user ? (
              <>
                <li>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </li>{" "}
                <li>
                  <Link href="/profile-ssr">
                    <a>Profile (SSR)</a>
                  </Link>
                </li>{" "}
                <li>
                  <Link href="/api/logout">
                    <a>Logout</a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/api/login">
                    <a>Login</a>
                  </Link>
                </li>
              </>
            ))}
        </ul>
      </nav>
      <style jsx>{`
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
        nav {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:nth-child(3) {
          margin-right: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        button {
          font-size: 1rem;
          color: #fff;
          cursor: pointer;
          border: none;
          background: none;
        }
      `}</style>
    </header>
  );
};
export default Header;
