import Link from "next/link";

export default function NewIssue() {
  return (
    <>
      <section className="py-2 px-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Issues</Link>
            </li>
            <li>New Thread</li>
          </ul>
        </div>
        <section className="artboard bg-base-200 px-4 py-2 rounded-md">
          <h1 className="font-bold text-lg">New issue</h1>
          <div className="divider m-0" />
          <section className="pt-2">
            <h1>Add a title</h1>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full max-w-xs"
            />
          </section>
          <section className="py-2">
            <h1>Add a description</h1>
            <textarea
              className="
            textarea
            textarea-bordered
            textarea-md
            w-full
            max-w-xs"
              placeholder="Describe your issue..."
            />
          </section>
          <button className="btn btn-success btn-xs">Submit new issue</button>
        </section>
      </section>
    </>
  );
}
