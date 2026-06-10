"use client";

import { useRef } from "react";

export default function AddProspectButton() {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div className={"flex flex-row justify-end"}>
      <button
        className={"btn btn-primary btn-lg"}
        onClick={() => modalRef?.current && modalRef.current.showModal()}
      >
        Add Prospect
      </button>
      <dialog ref={modalRef} className={"modal"}>
        <div className={"modal-box"}>
          <h3 className="font-bold text-lg">Add Prospect</h3>
          <p className="py-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium at atque, earum facilis fuga in ipsa laboriosam officia
            possimus quasi, reprehenderit rerum ut! Commodi ducimus expedita
            soluta? Fuga, recusandae, sint.
          </p>
          <form className={"flex flex-col gap-4"}>
            <fieldset className={"fieldset"}>
              <legend className={"fieldset-legend"}>Company Name</legend>
              <input className={"input w-full"} />
              <legend className={"fieldset-legend"}>Position</legend>
              <input className={"input w-full"} />
            </fieldset>
            <button type={"submit"} className={"btn btn-primary"}>
              Submit
            </button>
          </form>
        </div>
        <form method={"dialog"} className={"modal-backdrop"}>
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
