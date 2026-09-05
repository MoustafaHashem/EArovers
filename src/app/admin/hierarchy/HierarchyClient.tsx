"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { updateHierarchyRole, removeRole } from "./actions";
import { toast } from "sonner";

type Person = {
  id: string;
  fullName: string;
  avatarUrl: string | null;
};

type RoleHistory = {
  id: string;
  personId: string;
  roleTitle: string;
  tier: string;
  isSecondary: boolean;
};

const TIERS = [
  {
    id: "highCouncil",
    title: "مجلس القيادة",
    roles: ["قائد العشيرة", "مساعد قائد العشيرة", "الرائد الأكبر", "قائدة الجوالات", "الرائدة الكبرى"],
  },
  {
    id: "auxiliary",
    title: "الهيكل المعاون",
    roles: ["قائد الميديا", "مساعد الميديا", "قائد السكرتارية", "مساعد السكرتارية", "أمين العهدة"],
  },
  {
    id: "management",
    title: "مجلس الإدارة",
    roles: ["رائد رهط الفايكنج", "وكيل رهط الفايكنج", "رائد رهط الفرسان", "وكيل رهط الفرسان"],
  },
];

export default function HierarchyClient({ 
  people, 
  initialRoles, 
  year 
}: { 
  people: Person[], 
  initialRoles: RoleHistory[], 
  year: number 
}) {
  const [roles, setRoles] = useState(initialRoles);
  const [loading, setLoading] = useState(false);

  // Unassigned people are those who don't have any role in this year
  const assignedPersonIds = new Set(roles.map(r => r.personId));
  const unassignedPeople = people.filter(p => !assignedPersonIds.has(p.id));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;

    // Dropped outside a droppable area
    if (!destination) return;
    
    // Dropped in the same place
    if (source.droppableId === destination.droppableId) return;

    setLoading(true);

    const personId = draggableId;
    const destDroppable = destination.droppableId; // format: "tierId|roleTitle" or "unassigned"

    if (destDroppable === "unassigned") {
      // Removing a role
      const sourceParts = source.droppableId.split("|");
      if (sourceParts.length === 2) {
        const promise = removeRole(personId, year, sourceParts[1]);
        
        toast.promise(promise, {
          loading: "جاري إزالة المنصب...",
          success: () => {
            setRoles(prev => prev.filter(r => !(r.personId === personId && r.roleTitle === sourceParts[1])));
            return "تمت الإزالة بنجاح";
          },
          error: "فشل إزالة المنصب"
        });
        
        await promise;
      }
    } else {
      // Assigning a role
      const [tier, roleTitle] = destDroppable.split("|");
      const isSecondary = tier === "auxiliary";

      const promise = updateHierarchyRole(personId, year, tier, roleTitle, isSecondary);
      
      toast.promise(promise, {
        loading: "جاري تحديث المنصب...",
        success: (res) => {
          if (!res.success) throw new Error("فشل التحديث");
          
          setRoles(prev => {
            const filtered = prev.filter(r => r.personId !== personId && r.roleTitle !== roleTitle);
            return [...filtered, {
              id: Math.random().toString(),
              personId,
              tier,
              roleTitle,
              isSecondary
            }];
          });
          
          return "تم تحديث المنصب بنجاح";
        },
        error: "فشل تحديث المنصب"
      });
      
      await promise;
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8" dir="rtl">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">بناء الهيكل لعام {year}</h1>
          <p className="text-gray-400 text-sm">قم بسحب الأعضاء إلى المناصب المحددة</p>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Unassigned Pool */}
          <div className="lg:col-span-1">
            <div className="glass-card p-4 rounded-2xl border border-[var(--color-dark-border)] h-[80vh] flex flex-col">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                الكوادر المتاحة
                <span className="bg-white/10 px-2 py-0.5 rounded text-sm">{unassignedPeople.length}</span>
              </h2>
              
              <Droppable droppableId="unassigned">
                {(provided, snapshot) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 overflow-y-auto pr-2 space-y-2 rounded-xl transition-colors ${
                      snapshot.isDraggingOver ? "bg-white/5" : ""
                    }`}
                  >
                    {unassignedPeople.map((person, index) => (
                      <Draggable key={person.id} draggableId={person.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 rounded-xl border border-[var(--color-dark-border)] bg-[var(--color-dark-bg)] shadow-md flex items-center gap-3 transition-transform ${
                              snapshot.isDragging ? "rotate-2 scale-105 border-[var(--color-scout-blue)]" : ""
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 shrink-0">
                              {person.avatarUrl ? (
                                <img src={person.avatarUrl} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">
                                  {person.fullName.substring(0, 2)}
                                </div>
                              )}
                            </div>
                            <span className="text-white font-bold text-sm">{person.fullName}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          {/* Tree Builder Area */}
          <div className="lg:col-span-3 space-y-6">
            {TIERS.map(tier => (
              <div key={tier.id} className="glass-card p-6 rounded-2xl border border-[var(--color-dark-border)]">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-[var(--color-scout-blue)] rounded-full"></span>
                  {tier.title}
                </h2>
                
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {tier.roles.map(roleTitle => {
                    const droppableId = `${tier.id}|${roleTitle}`;
                    const assignedRole = roles.find(r => r.roleTitle === roleTitle && r.tier === tier.id);
                    const assignedPerson = assignedRole ? people.find(p => p.id === assignedRole.personId) : null;

                    return (
                      <div key={roleTitle} className="bg-white/5 border border-[var(--color-dark-border)] rounded-xl p-4 flex flex-col">
                        <span className="text-xs font-bold text-[var(--color-scout-blue)] mb-3">{roleTitle}</span>
                        
                        <Droppable droppableId={droppableId} isDropDisabled={!!assignedPerson}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`flex-1 min-h-[60px] rounded-lg border-2 border-dashed transition-colors flex items-center justify-center p-2 ${
                                snapshot.isDraggingOver 
                                  ? "border-[var(--color-scout-blue)] bg-[var(--color-scout-blue)]/10" 
                                  : (assignedPerson ? "border-transparent" : "border-gray-700 bg-black/20")
                              }`}
                            >
                              {assignedPerson ? (
                                <Draggable draggableId={assignedPerson.id} index={0}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`w-full p-2 rounded-lg bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] shadow-md flex items-center gap-3 ${
                                        snapshot.isDragging ? "opacity-50" : ""
                                      }`}
                                    >
                                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 shrink-0">
                                        {assignedPerson.avatarUrl ? (
                                          <img src={assignedPerson.avatarUrl} className="w-full h-full object-cover" />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">
                                            {assignedPerson.fullName.substring(0, 2)}
                                          </div>
                                        )}
                                      </div>
                                      <span className="text-white font-bold text-sm truncate">{assignedPerson.fullName}</span>
                                    </div>
                                  )}
                                </Draggable>
                              ) : (
                                <span className="text-gray-500 text-xs font-medium">اسحب الكادر هنا</span>
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </DragDropContext>
      
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[var(--color-scout-blue)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
