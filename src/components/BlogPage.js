import { useParams } from "react-router-dom";
import { blogs } from "./Blog";
import { useEffect, useState, useContext } from "react";
import { BuyContext } from "./BuyModal";

export const BlogPage = () => {
  const [blog, setBlog] = useState({});
  const { blogTitle } = useParams();
  const { handleLinkOpen } = useContext(BuyContext);

  useEffect(() => {
    if (blogs) {
      const decodeTitle = decodeURIComponent(blogTitle);
      const currentBlog = blogs.find((item) => item.title === decodeTitle);
      setBlog(currentBlog);
    }
  }, [blogTitle]);

  useEffect(() => {
    handleLinkOpen();
  }, [handleLinkOpen]);

  return (
    <div className="blog__page">
      <img className="blog__img" src={blog.img} alt="" />
      <div className="blog__info">
        <div className="blog__data">{blog.data}</div>
        <div className="blog__title">{blog.title}</div>
        <div className="blog__text">{blog.text}</div>
      </div>
    </div>
  );
};
