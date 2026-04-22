-- DropForeignKey
ALTER TABLE "SceneCharacter" DROP CONSTRAINT "SceneCharacter_sceneId_fkey";

-- AddForeignKey
ALTER TABLE "SceneCharacter" ADD CONSTRAINT "SceneCharacter_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scene"("id") ON DELETE CASCADE ON UPDATE CASCADE;
